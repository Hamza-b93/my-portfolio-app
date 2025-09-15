<template>
  <section class="mb-12">
    <h2 class="section-heading">Interests And Hobbies</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(interest, index) in interests" 
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center"
      >
        <Icon :name="interest.icon" class="text-blue-500 text-4xl mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium">{{ interest.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "InterestsAndHobbies",
  data() {
    return {
      interests: [
        { name: "Photography and Videography", icon: "mdi:camera" },
        { name: "Graphics Design (2D and 3D)", icon: "mdi:palette" },
        { name: "Videogames and E-sports", icon: "mdi:gamepad" },
        { name: "Tennis, Football, Swimming and Hiking", icon: "mdi:soccer" },
        { name: "Bilingual (English and Urdu)", icon: "mdi:translate" },
        { name: "Content Creation", icon: "mdi:content-create" }
      ]
    };
  }
};
</script>

<style scoped>
/* Using Tailwind classes instead of custom CSS */
</style>