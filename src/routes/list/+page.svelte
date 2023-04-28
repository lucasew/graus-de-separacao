<script lang="ts">
	import { Container } from "sveltestrap";
	import Vertice from "../../components/Vertice.svelte";
	import VerticeSearch from "../../components/VerticeSearch.svelte";
	import { verticesOrigem } from "../graph";
	let selected = ''
	$: console.log("selected", selected)

</script>

<VerticeSearch on:select={(e) => selected = e.detail.key}/>
<Container>
    {#each verticesOrigem as vertice}
        <Vertice vertice={vertice} />
    {/each}
</Container>