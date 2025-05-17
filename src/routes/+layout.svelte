<script>
    import { Collapse, Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Styles } from '@sveltestrap/sveltestrap';
	import ForkMeBanner from '../components/ForkMeBanner.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap-icons/font/bootstrap-icons.min.css'
</script>


<svelte:head>
    <title>Graus de Separação</title>
    <meta name="description" content="Ferramenta para calcular o grau de separação entre personalidades populares" />
</svelte:head>
<!-- <Styles /> -->

<ForkMeBanner url="https://github.com/lucasew/graus-de-separacao" />

<Container style="min-height: 100vh">
    <Navbar expand='md'>
        <NavbarBrand href="/">Graus de separação</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink href="/list">Lista</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/separation_degrees">Cálculo de graus de separação</NavLink>
                </NavItem>
            </Nav>
    </Navbar>

<slot/>
</Container>
