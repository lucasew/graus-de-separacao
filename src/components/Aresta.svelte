<script lang="ts">
	import { Card, CardBody, Image } from "@sveltestrap/sveltestrap";
	import { arestas, images, typedData } from "../routes/graph";

    export let aresta: string
    const image = images[aresta]
    const description = typedData[aresta.replace('.md', '')].basename
</script>

<Card>
    <CardBody>
        <Image loading='lazy' style='height: 4rem; aspect-ratio: 1; object-fit: cover;' thumbnail alt="{description}" src="/obsidian/{image}" />
        {description}
    </CardBody>
</Card>