const createExpenseModal = document.getElementById('create-expense-modal')
const createExpenseModalOpenBtn = document.getElementById('create-expense-trigger')
const createExpenseModalCloseBtn = document.getElementById('create-expense-close')

createExpenseModalOpenBtn.addEventListener('click', ()=>{
    createExpenseModal.showModal()
})

createExpenseModalCloseBtn.addEventListener('click', ()=>{
    createExpenseModal.close()
})

createExpenseModal.addEventListener('click', (event) => {
  const rect = createExpenseModal.getBoundingClientRect()
  const isInDialog = (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
  
  if (!isInDialog) {
    createExpenseModal.close()
  }
})
