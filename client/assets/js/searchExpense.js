const searchField = document.getElementById('search')
import { setSearch } from "./store.js"

searchField.addEventListener('input', (e)=>{
    const searchVal = e.target.value

    setSearch(searchVal)
})