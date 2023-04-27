<script lang='ts'>
	import { Button, Input, Modal, ModalBody, ModalHeader } from "sveltestrap";
	import { db } from "../routes/graph";
    import {search} from '@orama/orama'
	import Vertice from "./Vertice.svelte";
	import { writable } from "svelte/store";

    let open = false;
    function toggle() {
        open = !open
    }
    let searchValue = ''
    const foundValues = writable([])
    $: {
        console.log(searchValue)
        search(db, {
            term: searchValue,
            properties: ['name', 'key']
        }).then(values => Object.values(values.hits).map(d => d.document)).then(x => foundValues.set(x))
    }

</script>

<Button on:click={toggle}>Realizar pesquisa</Button>
<Modal isOpen={open} {toggle}>
    <ModalHeader>Procurar por famoso</ModalHeader>
    <ModalBody>
        <Input type='text' placeholder="Quem você quer escolher?" bind:value={searchValue}/>
        {#each $foundValues as value (value.key)}
            <Vertice vertice={value.key}/>
        {/each}
    </ModalBody>
</Modal>