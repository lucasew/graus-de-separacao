<script lang="ts">
	import { Container, Row } from "@sveltestrap/sveltestrap";
	import Vertice from "../../components/Vertice.svelte";
	import { verticesOrigem } from "../graph";

</script>

<Container>
    {#each verticesOrigem as vertice}
		<Row class="mb-3">
			<Vertice vertice={vertice} />
		</Row>
    {/each}
</Container>