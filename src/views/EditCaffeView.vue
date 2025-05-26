<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const description = ref('')
const time = ref('')

const saveData = async () => {
    const newCaffe = JSON.stringify({
        name: name.value,
        description: description.value,
        time: Date.parse(time.value)/1000,
    })

    const response = await fetch('/api/caffes', {
        method:'POST',
        body: newCaffe,
    })
    const data = await response.json()

    router.push('/')
}
</script>

<template>
    <h1>Edit Caffe Baru</h1>

     <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>Deskripsi</label>
            <input type="text" v-model="description">
        </div>
        <div>
            <label>Waktu</label>
            <input type="datetime-local" v-model="time">
        </div>

        <div>
            <input type="submit">
        </div>
    </form>
</template>