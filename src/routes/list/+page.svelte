<script lang="ts">
	import { Container } from "sveltestrap";
	import Vertice from "../../components/Vertice.svelte";
	import VerticeSearch from "../../components/VerticeSearch.svelte";
	import { verticesDestino, verticesOrigem } from "../graph";
</script>

<VerticeSearch/>
<Container>
    {#each verticesOrigem as vertice}
        <Vertice vertice={vertice} />
    {/each}
</Container>