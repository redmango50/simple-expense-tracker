export let expenses = []

async function fetchExpenses(){
    try{
        const response = await fetch("http://localhost:9000/expenses")
        
        if(!response.ok){
            throw new Error(`Status: ${response.status} Error: ${response.text}`)
        }

        const fetchedExpenses = await response.json()
        expenses = fetchExpenses
    }
    catch(err){
        console.error(err)
    }
}

function getExpensesDefault(){
    return expenses
}