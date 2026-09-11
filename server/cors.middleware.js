export async function corsMiddleware(req, next) {

    const corsHeaders = {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
    }

    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                ...corsHeaders
            }
        })
    }

    const response = await next(req)
    const finalHeaders = new Headers(response.headers)

    Object.entries(corsHeaders).forEach(([key, value]) => {
        finalHeaders.set(key, value)
    })

    return new Response(response.body, {
        status: response.status,
        headers: finalHeaders
    })
}