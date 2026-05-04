<template>
  <section class="mb-12">
    <h2 class="section-heading">Work Experience</h2>

    <div class="space-y-8">
      <div v-for="job in data?.experience" :key="job.role + job.company" class="card">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ job.role }}</h3>
            <p class="text-lg text-blue-600 dark:text-blue-400">{{ job.company }}</p>
          </div>
          <span
            class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full mt-2 md:mt-0">
            {{ job.dates }}<template v-if="job.note"> ({{ job.note }})</template>
          </span>
        </div>

        <div class="space-y-6">
          <div v-for="project in job.projects" :key="project.name">
            <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-3">
              {{ project.name }}<template v-if="project.stack"> ({{ project.stack }})</template>
            </h4>
            <ul class="space-y-2 text-gray-600 dark:text-gray-300">
              <li v-for="(bullet, i) in project.bullets" :key="i" class="flex">
                <span class="text-blue-500 mr-2">•</span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data } = useResumeData()
</script>
