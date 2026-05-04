<template>
  <section class="mb-16">
    <h2 class="section-heading">Educational Background</h2>

    <div class="space-y-8">
      <div
        v-for="entry in data?.education"
        :key="entry.degree"
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ entry.degree }}</h3>
              <p class="text-xl text-blue-600 dark:text-blue-400 mt-1">{{ entry.institution }}</p>
            </div>
            <span
              class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full mt-2 md:mt-0">
              {{ entry.period }}
            </span>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-4 text-lg">{{ entry.description }}</p>

          <div v-if="entry.skills.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Skills</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in entry.skills"
                :key="skill"
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-if="entry.project" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <Icon name="mdi:certificate" class="mr-2 text-blue-500" />
              Final Year Project
            </h4>
            <p class="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              {{ entry.project }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { data } = useResumeData()
</script>
