<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Caffe {
  id: number
  name: string
  description: string
  time: string
}

const caffes = ref<Caffe[]>([])

const fetchCaffes = async () => {
  const response = await fetch('/api/caffes')
  const data = await response.json()
  caffes.value = data
}

onMounted(() => {
  fetchCaffes()
})

</script>

<template>
  <main>
    <div>Silahkan Pilih Coffe Terbaik Anda</div>

    <div>>
      <ul>
        <li v-for="caffe in caffes" :key="caffe.id">
          <div>{{ caffe.name }}</div>
          <div>{{ caffe.description }}</div>
          <div>{{ caffe.time }}</div>
        </li>
      </ul>
    </div>
  </main>
</template>
