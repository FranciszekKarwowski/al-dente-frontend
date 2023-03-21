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
    visits: [Visit],
    phoneNumber: string,
    pesel: string,
    firstName: string,
    lastName: string,
    id: string,
    gender: string,
    birthdate: string;
}

const fetchedPatient = ref({ visits: [], phoneNumber: "", pesel: "", firstName: "", lastName: "", id: "", gender: "", birthdate: "" })
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
    <div class="columnContainer">
        <div>Basic info
            <div>PESEL *
                <input v-model="pesel" :placeholder=fetchedPatient.pesel>
            </div>
            <div>Name *
                <input v-model="firstName" :placeholder=fetchedPatient.firstName>
            </div>
            <div>Last Name *
                <input v-model="lastName" :placeholder=fetchedPatient.lastName>
            </div>
            <div>Birthdate *
                <input v-model="birthdate" :placeholder=fetchedPatient.birthdate>
            </div>
            <div>Phone Number *
                <input v-model="phoneNumber" :placeholder=fetchedPatient.phoneNumber>
            </div>
            <div>Gender *
                <select :value=fetchedPatient.gender>
                    <option name="male">Male</option>
                    <option name="female">Female</option>
                </select>
            </div>
        </div>
        <div>History of visits
            <table>
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
        <div></div>
    </div>
</template>

<style scoped>
.columnContainer {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>