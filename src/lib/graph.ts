import { create, insert } from '@orama/orama';
import data from '../../static/obsidian/meta.json';

export type ObsidianRecord = {
	basename: string;
	ctime: number;
	extension: string;
	mtime: number;
	name: string;
	path: string;
	referencedBy: string[];
};
export type ObsidianMeta = Record<string, ObsidianRecord>;

export const typedData = data as ObsidianMeta;

export const arestas: Record<string, string[]> = {};
export const images: Record<string, string> = {};
for (const x of Object.keys(typedData)) {
	const item = typedData[x];
	if (x.startsWith('assets/')) {
		for (const ref of item.referencedBy) {
			images[ref] = x;
		}
	}

	if (x.startsWith('Vértices/')) {
		for (const ref of item.referencedBy) {
			if (!arestas[ref]) {
				arestas[ref] = [];
			}
			arestas[ref].push(x);
		}
	}
}

export const vertices: Record<string, Record<string, string>> = {};
for (const aresta of Object.keys(arestas)) {
	const referencias = arestas[aresta];
	for (const i of referencias) {
		for (const j of referencias) {
			if (i == j) continue;
			if (!vertices[i]) {
				vertices[i] = {};
			}
			vertices[i][j] = aresta;
		}
	}
}

export const verticesOrigem = Object.keys(vertices).sort();

export const verticesDestino = [
	...new Set(verticesOrigem.map((origem) => Object.keys(vertices[origem] || {})).flat())
].sort();

export function getShortestPath(from: string, to: string) {
	const mkKey = (key: string) => `Vértices/${key}`;
	const fromKey = mkKey(from);
	const toKey = mkKey(to);
	if (fromKey === toKey) {
		return null;
	}
	const paths: Record<string, string[] | undefined> = {};
	const visit: Record<string, boolean> = {};
	paths[fromKey] = [];
	const queue: string[] = []; // como todos tem o mesmo peso dá pra reduzir o overhead com uma pinha
	queue.push(fromKey);
	while (queue.length > 0) {
		const currentNode = queue.pop() as string; // pop de vetor não vazio não entrega undefined
		for (const successor of Object.keys(vertices[currentNode] || {})) {
			const proposition = [...(paths[currentNode] || []), currentNode];
			if (!paths[successor] || (paths[successor]?.length ?? Infinity) > proposition.length) {
				paths[successor] = proposition;
			}
			if (!visit[successor]) {
				queue.push(successor);
				visit[successor] = true;
			}
		}
	}
	const finalPath = paths[toKey];
	if (!finalPath) {
		return null;
	}
	return [...finalPath, toKey];
}

export const db = (async function () {
	const db = await create({
		schema: {
			name: 'string',
			key: 'string'
		}
	});

	await Promise.all(
		verticesOrigem.map(async (vertice) => {
			const { path, basename } = typedData[vertice];
			await insert(db, {
				name: basename,
				key: vertice,
				path
			});
		})
	);
	return db;
})();

globalThis.typedData = typedData;
