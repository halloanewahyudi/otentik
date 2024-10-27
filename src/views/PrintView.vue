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

const print = () => {
  const printContent = document.getElementById('printMe').innerHTML;
  const style = `
    <style>
      ${document.querySelector("style").innerHTML}
    </style>
  `;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = style + printContent;
  window.print();
  document.body.innerHTML = originalContent;
}
</script>

<style scoped>
.print {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
}

</style>