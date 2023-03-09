<script setup lang="ts">
    let id = 0;
    const patients = [
        { id:id++, name: 'Areczek', surname: 'Mareczek' },
        { id:id++, name: 'Franek', surname: 'Karwa' },
        { id:id++, name: 'Tomasz', surname: 'Sztajka' },
        { id:id++, name: 'Jancja', surname: 'Gontar' },
    ];

</script>

<template>
    <main>
        <ul>
            <li v-for="patient in patients">
                {{ patient.name }} {{ patient.surname }}
            </li>
        </ul>
    </main>
</template>
