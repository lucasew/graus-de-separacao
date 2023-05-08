<script>
    import { Collapse, Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Styles } from 'sveltestrap/src';
	import ForkMeBanner from '../components/ForkMeBanner.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap-icons/font/bootstrap-icons.min.css'

    let isNavbarOpen = false;
    function handleNavbarUpdate(event) {
        isNavbarOpen = event.detail.isOpen;
    }
</script>


<!-- <Styles /> -->

<ForkMeBanner url="https://github.com/lucasew/graus-de-separacao" />

<Container style="min-height: 100vh">
    <Navbar expand='md'>
        <NavbarBrand href="/">Graus de separação</NavbarBrand>
        <NavbarToggler on:click={() => {isNavbarOpen = !isNavbarOpen}} />
        <Collapse isOpen={isNavbarOpen} navbar expand="md" on:update={handleNavbarUpdate}>
            <Nav>
                <NavItem>
                    <NavLink href="/list">Lista</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/separation_degrees">Cálculo de graus de separação</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>

<slot/>
</Container>