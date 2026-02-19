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
