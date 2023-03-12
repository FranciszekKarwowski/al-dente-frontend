<script setup lang="ts">
    import { getAccessToken } from '@/services/auth';
    const accessToken = await getAccessToken();
    const response = await fetch('http://localhost:5173/Patient', {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    })
    const body = await response.json();
    const patients = body;
</script>

<template>
    <main>
        <ul>
            <li v-for="patient in patients">
                {{ patient.firstName }} {{ patient.lastName }} {{ patient.gender }} {{ patient.pesel }} {{ patient.birthdate }} {{ patient.phoneNumber }}
            </li>
        </ul>
    </main>
</template>
