<script setup lang="ts">
import { getAccessToken } from '@/services/auth';
import { type Ref, ref } from 'vue';
import { useRoute } from 'vue-router';


interface Visit {
    visitId: string,
    status: string,
    startTime: string,
    endTime: string,
}

interface Patient {
    visits: Visit[],
    phoneNumber: string,
    pesel: string,
    firstName: string,
    lastName: string,
    id: string,
    gender: string,
    birthdate: string;
}

const fetchedPatient: Ref<Patient> = ref({ visits: [], phoneNumber: "", pesel: "", firstName: "", lastName: "", id: "", gender: "", birthdate: "" })
const route = useRoute()

async function fetchData() {
    const accessToken = await getAccessToken()
    const res = await fetch('http://localhost:5173/Patient?id=' + route.params.id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })
    fetchedPatient.value = await res.json()
}

fetchData()

const pesel = ref("")
const firstName = ref("")
const lastName = ref("")
const birthdate = ref("")
const phoneNumber = ref("")
const gender = ref("")
</script>

<template>
    <div class="content">
        <div class="columnContainer">Basic info
            <div class="basicInfoRow">PESEL *
                <input v-model="pesel" :placeholder=fetchedPatient.pesel>
            </div>
            <div class="basicInfoRow">Name *
                <input v-model="firstName" :placeholder=fetchedPatient.firstName>
            </div>
            <div class="basicInfoRow">Last Name *
                <input v-model="lastName" :placeholder=fetchedPatient.lastName>
            </div>
            <div class="basicInfoRow">Birthdate *
                <input v-model="birthdate" :placeholder=fetchedPatient.birthdate>
            </div>
            <div class="basicInfoRow">Phone Number *
                <input v-model="phoneNumber" :placeholder=fetchedPatient.phoneNumber>
            </div>
            <div class="basicInfoRow">Gender *
                <select class="select" :value=fetchedPatient.gender id="standard-select">
                    <option name="male">Male</option>
                    <option name="female">Female</option>
                </select>
            </div>
        </div>
        <div class="columnContainer">History of visits
            <table style="font-size: 15px;">
                <tr>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
                <tr v-for="visit in fetchedPatient.visits" :key="visit.visitId">
                    <td>{{ visit.startTime + '-' + visit.endTime }}</td>
                    <td>{{ visit.status }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
    gap: 20px;
}
.columnContainer {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    font-size: x-large;
}

.basicInfoRow {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 15px;
}


</style>