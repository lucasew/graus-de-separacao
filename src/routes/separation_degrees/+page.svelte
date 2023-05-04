<script lang="ts">
	import { Button, Col, Container, Row } from "sveltestrap/src";
	import VerticeSearch from "../../components/VerticeSearch.svelte";
	import { typedData, type ObsidianRecord } from "../graph";

    let originKey = ''
    let destinationKey = ''
    let originData: ObsidianRecord | undefined
    $: originData = typedData[originKey.replace('.md', '')]
    let destinationData: ObsidianRecord | undefined
    $: destinationData = typedData[destinationKey.replace('.md', '')]
</script>

<h1>Selecione duas personalidades:</h1>
<Container>
    <VerticeSearch on:select={(e) => originKey = e.detail.key}/>

    <VerticeSearch on:select={(e) => destinationKey = e.detail.key}/>

    <Button disabled={!(originData && destinationData && (originKey !== destinationKey))}>Realizar busca</Button>
</Container>