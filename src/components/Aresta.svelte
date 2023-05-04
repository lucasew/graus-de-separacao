<script lang="ts">
	import { arestas, images, typedData } from "../routes/graph";

    export let aresta: string
    const image = images[aresta]
    const vertices = arestas[aresta]
    const description = typedData[aresta.replace('.md', '')].basename
</script>

<pre>{JSON.stringify({description, image, vertices}, null, 2)}</pre>
