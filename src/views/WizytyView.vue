<script setup lang="ts">
import { getAccessToken } from '@/services/auth'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Patient {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    pesel: string,
}

interface Visit {
    id: string,
    status: string,
    patient: Patient,
    startTime: string,
    endTime: string,
}

const nameFilter = ref("")
const dateFilter = ref("")

const fetchedVisits: Ref<Array<Visit>> = ref([])
const filteredVisits = computed(() => {
    return [...new Set(fetchedVisits.value.map((v) => stringToYYDDMM(v.startTime)))].map((d) => fetchedVisits.value.filter((v) => d === stringToYYDDMM(v.startTime)))
})

async function fetchData() {
    fetchedVisits.value = []
    const accessToken = await getAccessToken()
    const res = await fetch('http://localhost:5174/Visit', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
    })
    fetchedVisits.value = await res.json()
}

function stringToHHmm(date: string) {
    return new Date(Date.parse(date)).toISOString().substring(11, 16)
}

function stringToYYDDMM(date: string) {
    return new Date(Date.parse(date)).toISOString().substring(2, 10)
}

fetchData()
</script>

<template>
    <VueDatePicker v-model="dateFilter" range />
    <input v-model="nameFilter" placeholder="Pacjent">
    <ul>
        <li v-for="visits in filteredVisits">
            {{ stringToYYDDMM(visits[0].startTime) }}
            <table>
                <tr>
                    <th>Godz</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Pesel</th>
                    <th>Telefon</th>
                    <th>Status</th>
                </tr>
                <tr v-for="visit in visits" :key="visit.id">
                    <td>{{ stringToHHmm(visit.startTime) + '-' + stringToHHmm(visit.endTime) }}</td>
                    <td>{{ visit.patient.firstName }}</td>
                    <td>{{ visit.patient.lastName }}</td>
                    <td>{{ visit.patient.pesel }}</td>
                    <td>{{ visit.patient.phoneNumber }}</td>
                    <td>{{ visit.status }}</td>
                </tr>
            </table>
        </li>
    </ul>
</template>
