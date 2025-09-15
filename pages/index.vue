<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8">
      <header class="text-center py-12 fade-in-up">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          My Professional Portfolio
        </h1>
        <div class="w-24 h-1 bg-blue-500 mx-auto"></div>
      </header>
      
      <main class="space-y-16">
        <div class="fade-in-up" style="animation-delay: 0.1s">
          <Bio />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.2s">
          <Experience />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.3s">
          <CertificationsAndAchievements />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.4s">
          <CoreStrengthsAndSkills />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.5s">
          <SupportingSkillsAndStrengths />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.6s">
          <EducationalBackground />
        </div>
        <div class="fade-in-up" style="animation-delay: 0.7s">
          <InterestsAndHobbies />
        </div>
      </main>
      
      <footer class="text-center py-8 mt-12 text-gray-600 dark:text-gray-400 fade-in-up">
        <p>© {{ new Date().getFullYear() }} - All Rights Reserved</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<style scoped>
/* Removed unused styles */
</style>
#hamzabutt
