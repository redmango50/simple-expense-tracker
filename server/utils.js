export function validateExpenseSchema(expense){
    return expense.title && expense.description && expense.category && expense.amount
}