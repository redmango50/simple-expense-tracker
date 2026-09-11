import { corsMiddleware } from "./cors.middleware.js"
import { validateExpenseSchema } from "./utils.js";

const expenseKv = await Deno.openKv()

Deno.serve({ port: 9000 }, async (req) => {
  return await corsMiddleware(req, async (modifiedReq) => {

    const method = modifiedReq.method
    const url = new URL(modifiedReq.url)

    if (!url.pathname.startsWith('/expenses')) {
      return Response.json({ message: "Not Found" }, {
        status: 404
      })
    }

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
      return Response.json({ message: "Method Not Allowed" }, {
        status: 405
      })
    }

    if (url.pathname === '/expenses' && method === 'GET') {
      const expenses = []
      try {
        const entries = expenseKv.list({ prefix: ["expenses"] })

        for await (const entry of entries) {
          if (entry.key.length !== 2) continue

          expenses.push(entry.value)
        }
      }
      catch {
        return Response.json({ message: "Internal Server Error" }, {
          status: 500
        })
      }

      return Response.json(expenses, {
        status: 200
      })
    }

    if (url.pathname === '/expenses' && method === 'POST') {
      const requestedExpense = await modifiedReq.json()

      if (!validateExpenseSchema(requestedExpense)) {
        return Response.json({ message: "Bad Request" }, {
          status: 400
        })
      }

      let createdExpense

      try {
        const toCreateExpense = { id: crypto.randomUUID(), ...requestedExpense }
        await expenseKv.set(["expenses", toCreateExpense.id], toCreateExpense)

        createdExpense = toCreateExpense
      }
      catch {
        return Response.json({ message: "Internal Server Error" }, {
          status: 500
        })
      }

      return Response.json(createdExpense, {
        status: 201
      })
    }

    const pattern = new URLPattern({ pathname: "/expenses/:id" })
    const match = pattern.exec(url)

    if (method === 'DELETE' && match) {
      const expenseId = match.pathname.groups.id

      try {
        const key = ["expenses", expenseId]

        const existing = await expenseKv.get(key);
        if (existing.value === null) {
          return Response.json({ message: "Expense not found" }, { status: 404 });
        }

        await expenseKv.delete(key)
      }
      catch {
        return Response.json({ message: "Internal Server Error" }, {
          status: 500
        })
      }

      return new Response(null, {
        status: 204
      })
    }


    return new Response("Bad Request", {
      status: 400
    })
  })
})