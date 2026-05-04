<template>
  <section class="mb-12">
    <h2 class="section-heading">Interests And Hobbies</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="interest in interests"
        :key="interest.name"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center"
      >
        <Icon :name="interest.icon" class="text-blue-500 text-4xl mb-4" />
        <span class="text-gray-800 dark:text-gray-200 font-medium">{{ interest.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { interestIcons } from '~/data/iconConfig'

const { data } = useResumeData()

const interests = computed(() =>
  (data.value?.additionalInfo.interests ?? []).map((name: string) => ({
    name,
    icon: interestIcons[name] ?? 'mdi:star',
  }))
)
</script>
