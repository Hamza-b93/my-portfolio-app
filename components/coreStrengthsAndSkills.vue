<template>
  <section class="mb-12">
    <h2 class="section-heading">Core Strengths And Skills</h2>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div 
        v-for="(skill, index) in skills" 
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <Icon :name="skill.icon" width="64" height="64" class="text-blue-500 mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CoreStrengthsAndSkills",
  data() {
    return {
      skills: [
        { name: "Node.js", icon: "devicon:nodejs" },
        { name: "JavaScript", icon: "devicon:javascript" },
        { name: "Git", icon: "devicon:git" },
        { name: "Docker", icon: "devicon:docker" },
        { name: "Podman", icon: "devicon:podman" },
        { name: "Vue.js", icon: "devicon:vuejs" },
        { name: "SQL", icon: "carbon:sql" },
        { name: "NOSQL", icon: "mdi:database" },
        { name: "Linux", icon: "skill-icons:linux-light" },
        { name: "Alibaba Cloud", icon: "devicon:alibabacloud" },
        { name: "Web Sockets", icon: "logos:websocket" }
      ]
    };
  }
};
</script>

<style scoped>
/* Using Tailwind classes instead of custom CSS */
</style>