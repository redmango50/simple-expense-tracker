import { setSortingMethod } from './store.js'

const sortingBtn = document.querySelectorAll('.sorting-handler') 

sortingBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        setSortingMethod(btn.dataset.sort) 
    })
})
