import { error } from "@sveltejs/kit"
import { vertices } from "../../../graph"

const mkKey = (key: string) => `Vértices/${key}`
const mkVtx = (key: string) => vertices[mkKey(key)]

function getShortestPath(from: string, to: string) {
    const fromKey = mkKey(from)
    const toKey = mkKey(to)
    if (fromKey === toKey) {
        return null
    }
    let paths: Record<string, string[] | undefined> = {}
    let visit: Record<string, boolean> = {}
    paths[fromKey] = []
    let queue: string[] = [] // como todos tem o mesmo peso dá pra reduzir o overhead com uma pinha
    queue.push(fromKey)
    while (queue.length > 0) {
        const currentNode = queue.pop() as string // pop de vetor não vazio não entrega undefined
        for (const successor of Object.keys(vertices[currentNode])) {
            // console.log('node', currentNode, successor)
            const proposition = [...paths[currentNode], currentNode]
            if (!paths[successor] || paths[successor]?.length > proposition.length) {
                paths[successor] = proposition
            }
            if (!visit[successor]) {
                queue.push(successor)
                visit[successor] = true
            }
        }
    }
    if (!paths[toKey]) {
        return null
    }
    return [...paths[toKey], toKey]
}

export async function load(data) {

    console.log(data.params)
    const {from, to} = data.params
    if (!from || !to) {
        error(400, 'missing from or to')
    }
    return {
        from, to,
        fromNode: mkVtx(from),
        toNode: mkVtx(to),
        path: getShortestPath(from, to)
    }
}