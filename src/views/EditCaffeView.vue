<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const route = useRoute()
const id = route.params.id

const name = ref('')
const description = ref('')
const time = ref('')

const saveData = async () => {
    const caffe = JSON.stringify({
        name: name.value,
        description: description.value,
        time: Date.parse(time.value)/1000,
    })

    const response = await fetch(`/api/caffes/${id}`, {
        method:'PUT',
        body: caffe,
    })
    const data = await response.json()

    router.push('/')
}

onMounted(() => {
    fetch(`/api/caffes/${id}`)
        .then(response => response.json())
        .then(data => {
            name.value = data.name
            description.value = data.description
            time.value = new Date(data.time * 1000).toISOString().slice(0, 16)
        })
})
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