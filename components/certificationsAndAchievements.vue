<template>
  <section class="mb-12">
    <h2 class="section-heading">Certifications And Achievements</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(cert, index) in certifications" 
        :key="index"
        class="card"
      >
        <div class="flex items-center mb-4">
          <Icon v-if="cert.type === 'certification'" name="mdi:certificate" class="text-blue-500 text-2xl mr-3" />
          <Icon v-else name="mdi:trophy" class="text-yellow-500 text-2xl mr-3" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ cert.title }}</h3>
        </div>
        <p v-if="cert.description" class="text-gray-600 dark:text-gray-300 mb-2">{{ cert.description }}</p>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ cert.institution }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ cert.date }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CertificationsAndAchievements",
  data() {
    return {
      certifications: [
        {
          type: "certification",
          title: "Introduction to Data Analytics for Business",
          description: "",
          institution: "University Of Colorado Boulder",
          date: "Coursera"
        },
        {
          type: "certification",
          title: "UX Design Fundamentals",
          description: "",
          institution: "California Institute Of Arts",
          date: "Coursera"
        },
        {
          type: "certification",
          title: "Visual Elements Of User Interface Design",
          description: "",
          institution: "California Institute Of Arts",
          date: "Coursera"
        },
        {
          type: "certification",
          title: "Front-End Web UI Frameworks And Tools: Bootstrap 4",
          description: "",
          institution: "The Hong Kong University Of Science And Technology",
          date: "Coursera"
        },
        {
          type: "achievement",
          title: "Winner Of Forman Computing Society's Freshmen Gaming Competition (Counter Strike)",
          description: "",
          institution: "FCCU FCS 2016",
          date: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Using Tailwind classes instead of custom CSS */
</style>