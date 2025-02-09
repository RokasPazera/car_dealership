<script>
    import {tokenStore} from '../stores/userStore.js';
    import page from 'page';
    import Button from '../components/Button.svelte';


    let username = "";
    let email = "";
    let password = "";
    let password_confirmation = "";
    let currentError = null;

    const register = async () => {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            })
        });
        const result = await res.json();

        if (result.ok) {
            tokenStore.set(result);
            page('/');
            currentError = null;
        }
        if (password !== password_confirmation) {
            currentError = "Passwords do not match";
        }

        currentError = result.error;
    }

    const toLogin = () => {
        page('/Login');
    }
</script>

<main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <h2 class="text-center mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        {#if currentError}
            <h3 class="text-center text-red-700 font-bold tracking-tight">{currentError}</h3>
        {/if}

        <div class="flex flex-row justify-center">
            <button on:click={toLogin} class="">Login</button>
            <button >Register</button>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <form on:submit|preventDefault={register}>
                <div>
                    <input type="text"
                           name="username"
                           placeholder="username"
                           bind:value={username}
                           required
                           class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div>
                    <input type="email"
                           name="email"
                           placeholder="Email"
                           bind:value={email}
                           required
                           class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div class="flex items-center">
                    <input type="password"
                           name="password"
                           placeholder="Password"
                           bind:value={password}
                           required
                           class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div class="flex items-center">
                    <input type="password"
                           name="password_confirmation"
                           placeholder="repeat password"
                           bind:value={password_confirmation}
                           required
                           class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                <Button>Register</Button>
            </form>
        </div>
    </div>

</main>