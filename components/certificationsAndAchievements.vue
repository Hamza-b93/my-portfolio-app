<template>
  <section class="mb-12">
    <h2 class="section-heading">Certifications And Achievements</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in allItems" :key="item.title" class="card">
        <div class="flex items-center mb-4">
          <Icon
            :name="item.type === 'certification' ? 'mdi:certificate' : 'mdi:trophy'"
            :class="item.type === 'certification' ? 'text-blue-500' : 'text-yellow-500'"
            class="text-2xl mr-3"
          />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ item.title }}</h3>
        </div>
        <p class="font-medium text-gray-800 dark:text-gray-200">{{ item.institution }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ item.subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ResumeCertification, ResumeAchievement } from '~/composables/useResumeData'

const { data } = useResumeData()

const allItems = computed(() => [
  ...(data.value?.certifications ?? []).map((c: ResumeCertification) => ({
    type: 'certification' as const,
    title: c.title,
    institution: c.institution,
    subtitle: c.platform,
  })),
  ...(data.value?.achievements ?? []).map((a: ResumeAchievement) => ({
    type: 'achievement' as const,
    title: a.title,
    institution: a.event,
    subtitle: '',
  })),
])
</script>
