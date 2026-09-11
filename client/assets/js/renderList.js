import { 
  sortingMetod, 
  search, 
  getExpensesDefault, 
  getExpensesByHighest, 
  getExpensesByLowest 
} from './store.js';

function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function getProcessedExpenses() {
  let items;

  if (sortingMetod === 'highest') {
    items = getExpensesByHighest();
  } else if (sortingMetod === 'lowest') {
    items = getExpensesByLowest();
  } else {
    items = getExpensesDefault();
  }

  if (search && search.trim() !== '') {
    const query = search.toLowerCase();
    items = items.filter(item => {
      const title = String(item.title || '').toLowerCase();
      const description = String(item.description || '').toLowerCase();
      const category = String(item.category || '').toLowerCase();

      return title.includes(query) || description.includes(query) || category.includes(query);
    });
  }

  return items;
}

export function renderExpenses(selector = '.items-list') {
  const container = document.querySelector(selector);
  if (!container) return;

  const expensesToRender = getProcessedExpenses();

  if (expensesToRender.length === 0) {
    container.innerHTML = `<li class="item empty"><span>No items found</span></li>`;
    return;
  }

  container.innerHTML = expensesToRender
    .map(
      item => `
        <li class="item" data-id="${escapeHTML(item.id)}">
          <div class="item-wrapper">
            <span class="item-title">${escapeHTML(item.title)}</span>
            <span class="item-description">${escapeHTML(item.description)}</span>
          </div>
          <div class="item-actions">
            <span class="item-category-badge">${escapeHTML(item.category)}</span>
            <button class="delete" data-id="${escapeHTML(item.id)}" aria-label="Delete expense">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </li>
      `
    )
    .join('');
}

export function initRenderer(onDelete) {
  document.addEventListener('update:sort', () => renderExpenses());

  const listContainer = document.querySelector('.items-list');
  if (listContainer && onDelete) {
    listContainer.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete');
      if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        onDelete(id);
      }
    });
  }
}