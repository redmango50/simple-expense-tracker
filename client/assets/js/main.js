import { fetchExpenses } from './store.js';
import { renderExpenses, initRenderer } from './renderList.js';

async function app() {
  initRenderer((id) => {
     
  });

  await fetchExpenses();
  renderExpenses();
}

app();