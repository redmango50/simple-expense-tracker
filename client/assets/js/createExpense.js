// Modal Visiblity

const createExpenseModal = document.getElementById('create-expense-modal')
const createExpenseModalOpenBtn = document.getElementById('create-expense-trigger')
const createExpenseModalCloseBtn = document.getElementById('create-expense-close')
const submitBtn = document.getElementById('create-expense-submit')

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

// Form Logic

const createExpenseForm = document.getElementById('create-expense-form')
import { expenses } from './store.js'

let loading = false

createExpenseForm.addEventListener('submit', async(e)=>{
  e.preventDefault()

  const formData = new FormData(e.target)
  const title = formData.get('title')
  const category = formData.get('category')
  const amount = formData.get('amount')
  const description = formData.get('description')

  if(!(title.trim() && category.trim() && amount.trim() && description.trim())){
    window.alert("Fields cannot be empty")
    return
  }

  loading = true
  LoadingStateUpdate()

  try{
    const payload = {title: title, category: category, description: description, amount: Number(amount)}
    const response = await fetch("http://localhost:9000/expenses", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if(!response.ok){
      throw new Error(`Status: ${response.status} Error: ${response.statusText}`,)
    } 

    const created = await response.json()
    expenses.push(created)
    document.dispatchEvent(new CustomEvent('update:expense'))
  }
  catch(err){
    console.error(err)
  }
  finally{
    loading = false
    LoadingStateUpdate()
    createExpenseModal.close()
  }

})

function LoadingStateUpdate(){
  if(loading){
    submitBtn.innerText = 'Loading...'
    submitBtn.ariaDisabled = 'true'
    submitBtn.disabled = true
  }
  else{
    submitBtn.innerText = 'Create'
    submitBtn.ariaDisabled = 'false'
    submitBtn.disabled = false   
  }
}