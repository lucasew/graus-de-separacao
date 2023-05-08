<script lang="ts">
	import { Container, Icon } from 'sveltestrap/src';
    import Aresta from '../../../../components/Aresta.svelte';
	import { vertices } from '../../../graph.js';
	import Vertice from '../../../../components/Vertice.svelte';

    export let data

    const mkVtx = (key: string) => vertices[`Vértices/${key}`]
    console.log(data.path)

    function* range(from: number, to: number) {
        for (let x = from; x < to; x++) {
            yield x
        }
    }
</script>

<h1>{data.from} <Icon name="caret-right-fill" /> {data.to}</h1>

{#if !data.path}
    <h1>Nenhum caminho encontrado</h1>
{:else}
    {#each Array.from(range(0, data.path.length - 1)) as i}
        <Container class="mb-3">
            <Vertice vertice={data.path[i]} />
        </Container>
        <Container class="mb-3">
            <Aresta aresta={vertices[data.path[i]][data.path[i+1]]} />
        </Container>
    {/each}
    <Container class="mb-3">
        <Vertice vertice={data.path[data.path.length - 1]} />
    </Container>
{/if}

<!-- <h1>from: {JSON.stringify(data.fromNode)}</h1> -->
<!-- <h1>to: {JSON.stringify(data.toNode)}</h1> -->
<!-- <h1>path: {JSON.stringify(data.path)}</h1> -->