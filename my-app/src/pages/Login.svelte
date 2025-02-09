<script>
    import {tokenStore} from '../stores/userStore.js';
    import page from 'page';
    import Button from '../components/Button.svelte';

    let email = "";
    let password = "";
    let currentError = null;

    const login = async () => {
        const res = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });
        const result = await res.json();
        if (res.ok) {
            tokenStore.set(result);
            page('/');
            currentError = null;
        }
        currentError = result.error;
    }

    const toRegister = () => {
        page('/Register');
    }
</script>

<main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <h2 class="text-center mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        {#if currentError}
            <h3 class="text-center text-red-700 font-bold tracking-tight">{currentError}</h3>
        {/if}

        <div class="flex flex-row justify-center">
        <button class="">Login</button>
        <button on:click={toRegister}>Register</button>
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <form on:submit|preventDefault={login}>
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
                <div>
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
                </div>
                <Button>Log in</Button>
            </form>
        </div>
    </div>


</main>