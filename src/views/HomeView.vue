<script setup>
import { ref, nextTick } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import Codes from './../assets/codes';
import Valid from '@/components/Valid.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconClose from '@/components/icons/IconClose.vue';

const loading = ref(true)
const destroyed = ref(false)


const decodedResult = ref('')
const error = ref(null)
const isValid = ref(false)

// Daftar data valid yang diharapkan
const validData = Codes.codes // Isi dengan data yang Anda miliki

const reload = async () => {
  destroyed.value = true
  await nextTick()
  destroyed.value = false
  loading.value = true
}

function onDecode(result) {
  // Validasi apakah hasil QR ada di dalam daftar validData
  if (validData.includes(result[0].rawValue)) {
    decodedResult.value = result[0].rawValue
    isValid.value = true
    error.value = null
  } else {
    error.value = "QR Code tidak valid atau tidak ditemukan di database"
    isValid.value = false
  }

  console.log(result[0].rawValue)
}

function onInit(promise) {
  loading.value = false
  promise.catch(error => {
    if (error.name === 'NotAllowedError') {
      console.error("Izin kamera ditolak.")
    } else {
      console.error("Terjadi kesalahan:", error.message)
    }
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div v-if="error" class="max-w-[400px] mx-auto text-center flex flex-col gap-4 justify-center items-center ">
      <IconClose class="text-6xl text-red-500 animate-bounce" />
      <div class="text-red-500">
        <h4 class="text-xl"> Kode anda tidak valid </h4>
        <p>atau tidak di temukan didata base</p>
      </div>
      <button class="text-neutral-600" @click="$router.go(0)"> Kembali </button>
    </div>
    <div v-else-if="isValid" class="text-center flex flex-col gap-5 items-center">
      <Valid />
      <h4 class="text-xl text-green-600"> kode anda valid</h4>
      <button class="text-neutral-600" @click="$router.go(0)">Kembali </button>
    </div>
    <div v-else>
      <h4 class=" text-center mb-5"> Silakan Scan QRcode anda</h4>
      <div class="w-52 h-52 rounded-lg relative overflow-hidden mx-auto p-2 bg-white shadow-2xl">
        <qrcode-stream @detect="onDecode" @camera-on="onInit" v-if="!destroyed" class="rounded-lg">
          <div class=" flex flex-col justify-center items-center h-full" v-if="loading">
            <IconLoading  class="text-8xl text-green-600" />
          </div>
        </qrcode-stream>
      </div>
    </div>
  </div>
</template>
<style scoped>


</style>