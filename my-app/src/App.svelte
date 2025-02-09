<script>
 import Navbar from './components/Navbar.svelte';
 import Home from './pages/Home.svelte';
 import router from 'page';
 import Login from './pages/Login.svelte';
 import Register from "./pages/Register.svelte";


 let current = Home;

 router('/', () => current = Home)
 router('/Login', () => current = Login)
 router('/Register', () => current = Register)

 router.start()
</script>

<main>


 <svelte:component this={current} />
</main>

<style>

</style>
