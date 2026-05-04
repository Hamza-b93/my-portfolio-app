<template>
  <section class="mb-12">
    <h2 class="section-heading">Supporting Skills And Strengths</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <Icon :name="skill.icon" width="48" height="48" class="text-blue-500 mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium text-center">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { supportingSkillIcons } from '~/data/iconConfig'

const { data } = useResumeData()

const skills = computed(() =>
  (data.value?.supportingSkills ?? []).map((name: string) => ({
    name,
    icon: supportingSkillIcons[name] ?? 'mdi:code-tags',
  }))
)
</script>
