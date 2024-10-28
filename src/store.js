// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
import { ref } from 'vue'

export const useValidation = createGlobalState(() => {
    const codes = useStorage('validation-codes', []) // Menyimpan daftar kode dengan status validasinya

    // Fungsi untuk menambah atau memperbarui status kode
    function addOrUpdateCode(code, isValid) {
        const existingCode = codes.value.find(item => item.code === code)
        
        if (existingCode) {
            // Jika kode sudah ada, perbarui status
            existingCode.status = isValid ? 'valid' : 'invalid'
        } else {
            // Jika kode belum ada, tambahkan ke daftar
            codes.value.push({ code, status: isValid ? 'valid' : 'invalid' })
        }
    }

    return { codes, addOrUpdateCode }
})
