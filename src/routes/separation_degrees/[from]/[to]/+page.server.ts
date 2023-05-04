/** @type {import('./$types').PageLoad} */
export async function load(data) {
    console.log(data.params)
    return data.params
}