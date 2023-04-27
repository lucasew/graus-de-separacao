<script lang="ts">
	import { Container } from "sveltestrap";
	import Vertice from "../../components/Vertice.svelte";
	import VerticeSearch from "../../components/VerticeSearch.svelte";
	import { verticesDestino, verticesOrigem } from "../graph";
	let selected = null
	$: console.log("selected", selected)

</script>

<VerticeSearch on:select={(e) => selected = e.detail.key}/>
<Container>
    {#each verticesOrigem as vertice}
        <Vertice vertice={vertice} />
    {/each}
</Container>