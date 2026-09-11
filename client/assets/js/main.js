import { fetchExpenses } from './store.js';
import { renderExpenses, initRenderer, RenderDisplay } from './renderList.js';

async function app() {
  initRenderer(async (id) => {
     try{
      await fetch(`http://localhost:9000/expenses/${id}`, {
        method: 'DELETE'
      })
      document.dispatchEvent(new CustomEvent("update:expense"))
     }
     catch(err){
      console.error(err)
     }
  })
  await fetchExpenses();
  renderExpenses();
  RenderDisplay()
}

app()

document.addEventListener('update:expense', ()=>{
  app()
  RenderDisplay()
})