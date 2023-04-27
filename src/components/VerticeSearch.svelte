<script lang='ts'>
	import { Button, Input, Modal, ModalBody, ModalHeader } from "sveltestrap";
	import { db } from "../routes/graph";
    import {search} from '@orama/orama'
	import Vertice from "./Vertice.svelte";
	import { writable } from "svelte/store";
	import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher()

    let open = false;
    function toggle() {
        open = !open
    }

    function handleDispatcher(ev) {
        console.log(ev)
        const {key} = ev.detail
        dispatcher('select', {key})
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

</script>

<Button on:click={toggle}>Realizar pesquisa</Button>
<Modal isOpen={open} {toggle}>
    <ModalHeader>Procurar por famoso</ModalHeader>
    <ModalBody>
        <Input type='text' placeholder="Quem você quer escolher?" bind:value={searchValue}/>
        {#each $foundValues as value (value.key)}
            <Vertice on:click={handleDispatcher} clickable vertice={value.key}/>
        {/each}
    </ModalBody>
</Modal>