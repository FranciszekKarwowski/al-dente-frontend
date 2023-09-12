<script setup lang="ts">
import { getAccessToken } from '@/services/auth'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface Visit {
    visitId: string,
    status: string,
    firstName: string,
    lastName: string,
    startTime: string,
    endTime: string,
    pesel: string,
    phoneNumber: string,
    patientId: string,
}

const nameFilter = ref("")
const dateFilter = ref("")

const fetchedVisits: Ref<Array<{ day: string, visits: [Visit] }>> = ref([])

async function fetchData() {
    const accessToken = await getAccessToken()
    const res = await fetch('http://localhost:5173/Visit', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })
    fetchedVisits.value = await res.json()
}

function clearFilters() {
    nameFilter.value = "";
    dateFilter.value = "";
}

fetchData()
</script>

<template>
    <div class="topbar" style="padding-bottom: 0px;">
        <VueDatePicker class="VueDatePicker" v-model="dateFilter" range dark placeholder="Select Date" />
        <input v-model="nameFilter" placeholder="Patient">
        <button @click="fetchData">Search</button>
        <button @click="clearFilters">Clear</button>
    </div>
    <ul style="padding-left: 0;">
        <li v-for="dateVisits in fetchedVisits" style="list-style-type: none;">
            <div style="font-size: large; padding-top: 15px;">
                {{ dateVisits.day }}
            </div>
            <table>
                <tr>
                    <th style="width: 90px;">Time</th>
                    <th style="width: 150px;">First name</th>
                    <th style="width: 150px;">Last name</th>
                    <th style="width: 100px;">Pesel</th>
                    <th style="width: 85px;">Phone</th>
                    <th style="width: 80px;">Status</th>
                </tr>
                <tr v-for="visit in dateVisits.visits" :key="visit.visitId">
                    <td>{{ visit.startTime + '-' + visit.endTime }}</td>
                    <td>{{ visit.firstName }}</td>
                    <td>{{ visit.lastName }}</td>
                    <td>{{ visit.pesel }}</td>
                    <td>{{ visit.phoneNumber }}</td>
                    <td>{{ visit.status }}</td>
                </tr>
            </table>
        </li>
    </ul>
</template>

<style scoped>
    .VueDatePicker {
        width: 400px;
    }
</style>