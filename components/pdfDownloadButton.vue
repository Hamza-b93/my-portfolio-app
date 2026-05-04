<template>
  <button
    @click="handleDownload"
    class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center z-50 print:hidden"
    title="Download PDF Resume"
  >
    <Icon name="mdi:file-pdf-box" class="mr-2 text-xl" />
    <span>Download PDF</span>
  </button>
</template>

<script setup lang="ts">
import { usePdfGenerator } from '~/composables/usePdfGenerator'

const { data } = useResumeData()
const { generatePdf } = usePdfGenerator()

function handleDownload() {
  if (data.value) generatePdf(data.value)
}
</script>
