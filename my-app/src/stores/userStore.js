import { writable } from "svelte/store";

const storedToken = localStorage.getItem("token");

export const tokenStore = writable(storedToken);

tokenStore.subscribe((token) => {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
    }
});
export function setToken(token) {
    tokenStore.set(token);
}

export function clearToken() {
    tokenStore.set(null);
}