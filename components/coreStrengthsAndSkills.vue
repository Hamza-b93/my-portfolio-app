<template>
  <section class="mb-12">
    <h2 class="section-heading">Core Strengths And Skills</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <Icon :name="skill.icon" width="64" height="64" class="text-blue-500 mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { coreSkillIcons } from '~/data/iconConfig'

const { data } = useResumeData()

const skills = computed(() =>
  (data.value?.coreSkills ?? []).map((name: string) => ({
    name,
    icon: coreSkillIcons[name] ?? 'mdi:code-tags',
  }))
)
</script>
