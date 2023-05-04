<script lang="ts">
	import { vertices } from '../../../graph.js';

    export let data

    console.log(Object.keys(vertices))
    console.log(data)
    const mkVtx = (key: string) => vertices[`Vértices/${key}`]
</script>

<h1>from: {JSON.stringify(data.fromNode)}</h1>
<h1>to: {JSON.stringify(data.toNode)}</h1>