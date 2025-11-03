<template>
  <button
    @click="toggleDarkMode"
    class="fixed bottom-24 right-6 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center z-50 print:hidden hover:bg-gray-700 dark:hover:bg-gray-300"
    title="Toggle Dark Mode"
  >
    <Icon 
      :name="isDark ? 'mdi:white-balance-sunny' : 'mdi:weather-night'" 
      class="mr-2 text-xl" 
    />
    <span>{{ isDark ? 'Light' : 'Dark' }} Mode</span>
  </button>
</template>

<script>
export default {
  name: "DarkModeToggle",
  data() {
    return {
      isDark: false
    };
  },
  mounted() {
    // Check initial color mode
    this.isDark = document.documentElement.classList.contains('dark');
    
    // Listen for color mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.isDark = document.documentElement.classList.contains('dark');
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true
    });
  },
  methods: {
    toggleDarkMode() {
      const colorMode = useColorMode();
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    }
  },
  beforeUnmount() {
    // Clean up observer if needed
  }
};
</script>

<style scoped>
/* Button will be fixed at bottom right of screen, below the PDF download button */
</style>