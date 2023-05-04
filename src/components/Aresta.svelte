<script lang="ts">
	import { Card, CardBody, Image } from "sveltestrap/src";
	import { arestas, images, typedData } from "../routes/graph";

    export let aresta: string
    const image = images[aresta]
    const vertices = arestas[aresta]
    const description = typedData[aresta.replace('.md', '')].basename
</script>

<!-- <pre>{JSON.stringify({description, image, vertices}, null, 2)}</pre> -->

<Card>
    <CardBody>
        <Image style='height: 4rem; aspect-ratio: 1; object-fit: cover;' thumbnail alt="{description}" src="/obsidian/{images[aresta]}" />
        {description}
    </CardBody>
</Card>