<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Card, CardBody, Image } from "sveltestrap/src";
    import { images, typedData } from "../routes/graph";

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