<template>
  <div>
    <button @click="print" class="bg-green-600 py-2 px-6 rounded-lg text-white"> Print </button>
    <div id="printMe">
      <div class="print">
        <QrCode v-for="item in Code.codes" :code="item" />
      </div>

    </div>
  </div>

</template>

<script setup >

import QrCode from '@/components/QrCode.vue';
import Code from './../assets/codes.json'
import { getCurrentInstance } from 'vue';


// Ambil instance komponen saat ini
const { proxy } = getCurrentInstance();

// Fungsi untuk mencetak
const print = async () => {
  try {
    await proxy.$htmlToPaper('printMe');
  } catch (error) {
    console.error('Error printing:', error);
  }
};

// Contoh data yang ingin digunakan
const codeData = Code; // Pastikan ini sesuai dengan struktur data di codes.json
</script>

<style scoped>
.print {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2px;
}

</style>