<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { getAccessToken } from '@/services/auth';

const accessToken = await getAccessToken();

interface Patient {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    pesel: string,
    birthdate: string,
    gender: string,
}
const fetchedPatients: Ref<Array<Patient>> = ref([])
const searchPatient = ref('');

async function fetchData() {
    fetchedPatients.value = []
    const accessToken = await getAccessToken()
    const res = await fetch('http://localhost:5173/Patient', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    })
    fetchedPatients.value = await res.json()
}
async function filterChange() {
    fetchedPatients.value = []
    const accessToken = await getAccessToken()

    const fetchURL = searchPatient.value === '' ? '' : '?searchValue=' + searchPatient.value;
    const res = await fetch('http://localhost:5173/Patient' + fetchURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    })
    fetchedPatients.value = await res.json()
}

fetchData();
</script>
<template>
    <main>
        <div class="topbar">
            <input v-model="searchPatient" class="searchbox" type="text" @change="filterChange()" placeholder="Patient"/>
            <button class="new-patient-button" type="button">New patient</button>
        </div>
        <div>
            <table id="table">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>PESEL</th>
                    <th>Birth date</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="patient in fetchedPatients">
                    <td><span>{{ patient.firstName }}</span></td>
                    <td>{{ patient.lastName }}</td>
                    <td>{{ patient.gender }}</td>
                    <td>{{ patient.pesel }}</td>
                    <td>{{ patient.birthdate }}</td>
                    <td>{{ patient.phoneNumber }}</td>
                    <td>
                        <nav>
                            <RouterLink :to="`/patient/${patient.id}`">Patient details</RouterLink>
                        </nav>
                    </td>
                </tr>
            </table>
        </div>
    </main>
</template>

<style scoped>
</style>
