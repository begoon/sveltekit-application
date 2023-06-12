import { error, json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    let query: { [key:string]:string }  = {};
    const entries = new URL(request.url).searchParams.entries();
    for (let [key, value] of entries) {
        query[key] = value;
        if (key == "boom") {
            throw error(400, "!!!");
        }
    }
    return json({
        request: data,
        query: query,
        url: request.url,
        env: process.env,
    });
}
