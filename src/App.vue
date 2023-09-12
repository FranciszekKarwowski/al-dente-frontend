<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
    <header>
        <nav>
            <RouterLink to="/kalendarz">Calendar</RouterLink>
            <RouterLink to="/pacjenci">Patients</RouterLink>
            <RouterLink to="/profil">Profil</RouterLink>
            <RouterLink to="/wizyty">Visits</RouterLink>
        </nav>
    </header>
    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style scoped>
header {
    display: flex;
    position: sticky;
    z-index: 1;
    background-color: var(--color-background);
    top: 0;
} 

header .wrapper {
    display: flex;
    place-items: flex-start;
}

nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
}

main {
    margin: 0;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}


</style>
