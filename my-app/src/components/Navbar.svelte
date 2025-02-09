<script>
    import Logo from '../images/car-logo.png';
    import {tokenStore} from "../stores/userStore.js";
    import page from 'page';
    import Button from "./Button.svelte";

    let isLoggedIn = false;

    export const loggedIn = () => {
        if (tokenStore) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
    }

    const handleLogin = () => {
        page('/Login');
    }

    const handleLogout = () => {
        tokenStore.set(null);
    }


</script>

<main class="flex flex-row">
    <img class="max-w-20" src={Logo} alt="car logo">

    {#if !isLoggedIn}
        <Button on:click={handleLogin}>Login</Button>
    {:else}
        <button on:click={handleLogout}>log out</button>
    {/if}


</main>