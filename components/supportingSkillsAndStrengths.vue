<template>
  <section class="mb-12">
    <h2 class="section-heading">Supporting Skills And Strengths</h2>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div 
        v-for="(skill, index) in skills" 
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <Icon :name="skill.icon" width="48" height="48" class="text-blue-500 mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium text-center">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SupportingSkillsAndStrengths",
  data() {
    return {
      skills: [
        { name: "Nuxt.js", icon: "devicon:nuxtjs" },
        { name: "Linux", icon: "flat-color-icons:linux" },
        { name: "HTML", icon: "devicon:html5-wordmark" },
        { name: "Bootstrap", icon: "devicon:bootstrap" },
        { name: "CSS", icon: "devicon:css3-wordmark" },
        { name: "Tailwind CSS", icon: "devicon:tailwindcss" },
        { name: "POSTGRESQL", icon: "devicon:postgresql" },
        { name: "SupaBase", icon: "devicon:supabase" },
        { name: "MySQL", icon: "devicon:mysql" },
        { name: "MongoDB", icon: "devicon:mongodb" },
        { name: "Firebase", icon: "devicon:firebase" },
        { name: "AWS", icon: "skill-icons:aws-light" },
        { name: "Fastify", icon: "devicon:fastify" },
        { name: "Express.js", icon: "devicon:express" },
        { name: "MQTT", icon: "logos:mqtt" },
        { name: "Prisma", icon: "devicon:prisma" },
        { name: "Sequelize", icon: "devicon:sequelize" },
        { name: "Socket.IO", icon: "devicon:socketio" }
      ]
    };
  }
};
</script>

<style scoped>
/* Using Tailwind classes instead of custom CSS */
</style>