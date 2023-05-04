<script lang="ts">
	import { Button, Container } from "sveltestrap/src";
	import VerticeSearch from "../../components/VerticeSearch.svelte";
	import { typedData, type ObsidianRecord } from "../graph";
    import {goto} from '$app/navigation'
    let originKey = ''
    let destinationKey = ''
    let originData: ObsidianRecord | undefined
    $: originData = typedData[originKey.replace('.md', '')]
    let destinationData: ObsidianRecord | undefined
    $: destinationData = typedData[destinationKey.replace('.md', '')]

    let isSubmitable = false;
    $: isSubmitable = (originData && destinationData && (originKey !== destinationKey)) ?? false

    function handleSubmit() {
        if (!isSubmitable) return
        goto(window.location.href + `/${originData?.basename}/${destinationData?.basename}`)
    }
</script>

<h1>Selecione duas personalidades:</h1>
<Container class="mb-3">
    <VerticeSearch on:select={(e) => originKey = e.detail.key}/>
</Container>

<Container class="mb-3">
    <VerticeSearch on:select={(e) => destinationKey = e.detail.key}/>
</Container>

<Container class="mb-3">
    <Button
        disabled={!isSubmitable}
        on:click={handleSubmit}
    >Realizar busca</Button>
</Container>