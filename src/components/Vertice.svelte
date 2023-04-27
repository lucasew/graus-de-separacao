<script lang="ts">
    import { Card, CardBody, CardHeader, Image } from "sveltestrap";
    import { typedData, images } from "../routes/graph";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    export let vertice: string
    export let clickable: boolean = false

    const normalizedVertice = (vertice + '.md').replaceAll('.md.md', '.md')


    function handleClick() {
        if (clickable) {
            dispatch('click', {
                key: vertexNode.path
            })
        }
    }

    let vertexNode = typedData[vertice] ?? {}
</script>

<Card on:click={handleClick} style="{clickable ? "cursor: pointer;" : ''}">
    <CardBody>
        <Image style='height: 4rem; aspect-ratio: 1; object-fit: cover;' thumbnail alt="{vertexNode.basename}" src="/obsidian/{images[normalizedVertice]}" />
        {vertexNode.basename}
    </CardBody>
</Card>