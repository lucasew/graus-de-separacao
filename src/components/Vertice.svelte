<script lang="ts">
    import { Card, CardBody, CardHeader, Image } from "sveltestrap";
    import { typedData, images } from "../routes/graph";

    export let vertice: string
    const normalizedVertice = (vertice + '.md').replaceAll('.md.md', '.md')

    let vertexNode = typedData[vertice] ?? {}
</script>

<Card>
    <CardBody>
        <Image style='height: 4rem; aspect-ratio: 1; object-fit: cover;' thumbnail alt="{vertexNode.basename}" src="/obsidian/{images[normalizedVertice]}" />
        {vertexNode.basename}
    </CardBody>
</Card>