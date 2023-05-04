import { error } from "@sveltejs/kit"
import { vertices } from "../../../graph"

const mkKey = (key: string) => `Vértices/${key}`
const mkVtx = (key: string) => vertices[mkKey(key)]

export async function load(data) {

    console.log(data.params)
    const {from, to} = data.params
    if (!from || !to) {
        error(400, 'missing from or to')
    }
    return {
        from, to,
        fromNode: mkVtx(from),
        toNode: mkVtx(to)
    }
}