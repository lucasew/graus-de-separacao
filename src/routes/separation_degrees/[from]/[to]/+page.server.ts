import { error } from '@sveltejs/kit';
import { getShortestPath, vertices } from '$lib/graph';
import { reportError } from '$lib/error';

const mkKey = (key: string) => `Vértices/${key}`;
const mkVtx = (key: string) => vertices[mkKey(key)];

export async function load(data) {
	const { from, to } = data.params;
	if (!from || !to) {
		const errorMessage = 'missing from or to';
		reportError(new Error(errorMessage), { params: data.params });
		error(400, errorMessage);
	}
	return {
		from,
		to,
		fromNode: mkVtx(from),
		toNode: mkVtx(to),
		path: getShortestPath(from, to)
	};
}
