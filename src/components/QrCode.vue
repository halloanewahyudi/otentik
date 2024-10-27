<template>
    <div>
        <img :src="qrcode" />
    </div>
</template>

<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps({
    code:String
})
// `qrcode` will be a ref of data URL
const qrcode = useQRCode(props.code)
</script>

<style lang="scss" scoped>

</style>