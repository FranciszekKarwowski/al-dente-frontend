<script setup lang="ts">
</script>

<template>
    <div>{{ $route.params.id }}</div>
    <div class="columnContainer">
        <div>Basic info
            <div>PESEL *
                <input />
            </div>
            <div>Name *
                <input />
            </div>
            <div>Last Name *
                <input />
            </div>
            <div>Date of Birth *
                <input />
            </div>
            <div>Phone Number *
                <input />
            </div>
            <div>Sex *
                <select>
                    <option name="male">Male</option>
                    <option name="female">Female</option>
                </select>
            </div>
        </div>
        <div>History of visits
            <ul></ul>
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