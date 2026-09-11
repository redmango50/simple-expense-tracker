export let expenses = []
export let sortingMetod = 'default'
export let search = ''

export async function fetchExpenses(){
    try{
        const response = await fetch("http://localhost:9000/expenses")
        
        if(!response.ok){
            throw new Error(`Status: ${response.status} Error: ${response.text}`)
        }

        const fetchedExpenses = await response.json()
        expenses = fetchedExpenses
    }
    catch(err){
        console.error(err)
    }
}

export function getExpensesDefault(){
    return [...expenses]
}

export function getTotal(){
    return expenses.reduce((prev, current)=>{
        return prev + current.amount
    }, 0)
}

export function setSortingMethod(value){
    sortingMetod = value
    document.dispatchEvent(new CustomEvent('update:sort'))
}

export function getExpensesByHighest(){
    return [...expenses].sort((a, b) => b.amount - a.amount)
}

export function getExpensesByLowest(){
    return [...expenses].sort((a, b) => a.amount - b.amount)
}

export function setSearch(searchVal){
    search = searchVal
}

export function getSearchedValue(){
    return Object.values(expenses).some(fieldValue => 
        String(fieldValue).toLowerCase().includes(searchTerm.toLowerCase())
    )
}