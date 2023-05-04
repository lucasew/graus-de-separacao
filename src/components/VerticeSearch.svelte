<script lang='ts'>
	import { Button, Card, CardBody, CardFooter, Icon, Image, Input, Modal, ModalBody, ModalHeader } from "sveltestrap/src";
	import { db, typedData, images, type ObsidianRecord } from "../routes/graph";
	import type { ObsidianMeta } from "../routes/graph";
    import {search} from '@orama/orama'
	import Vertice from "./Vertice.svelte";
	import { writable } from "svelte/store";
	import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher()

    let open = false;
    function toggle() {
        open = !open
    }

    let selectedKey = ''
    function handleDispatcher(ev) {
        console.log(ev)
        const {key} = ev.detail
        dispatcher('select', {key})
        selectedKey = key.replace('.md', '')
        open = false
    }

    let searchValue = ''
    const foundValues = writable([])

    async function handleSearch(query: string) {
        const result = await search(await db, {
            term: query,
            properties: ['name', 'key']
        })
        const values = Object.values(result.hits).map(d => d.document)
        foundValues.set(values)
    }
    $: handleSearch(searchValue)
    $: console.log('selectedKey', selectedKey)
    $: console.log('node', typedData[selectedKey])

</script>

<Card>
    <CardBody>
        {#if typedData[selectedKey]}
            <Image style='height: 4rem; aspect-ratio: 1; object-fit: cover;' thumbnail alt="{typedData[selectedKey]?.basename}" src="/obsidian/{images[selectedKey + ".md"]}" />
            {typedData[selectedKey]?.basename}
        {:else}
            <div style="display: flex; align-items: center; justify-content: center; aspect-ratio: 1; height: 4rem">
                <Icon style='font-size: 2rem; aspect-ratio: 1; object-fit: cover;'  name="question"></Icon>
            </div>
        {/if}
    </CardBody>
    <CardFooter>
        <Button on:click={toggle}>Realizar pesquisa</Button>
    </CardFooter>
</Card>
<Modal isOpen={open} {toggle}>
    <ModalHeader>Procurar por famoso</ModalHeader>
    <ModalBody>
        <Input type='text' placeholder="Quem você quer escolher?" bind:value={searchValue}/>
        {#each $foundValues as value (value.key)}
            <Vertice on:click={handleDispatcher} clickable vertice={value.key}/>
        {/each}
    </ModalBody>
</Modal>