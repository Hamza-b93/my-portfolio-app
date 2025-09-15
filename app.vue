<template>
  <div class="antialiased">
    <NuxtPage />
    <PdfDownloadButton />
    <DarkModeToggle />
  </div>
</template>

<script setup>
// Add dark mode support
if (import.meta.client) {
  const colorMode = useColorMode();
  colorMode.preference = 'system';
}
</script>