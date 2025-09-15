<template>
  <section class="mb-16">
    <h2 class="section-heading">Educational Background</h2>

    <div class="space-y-8">
      <div
        v-for="(education, index) in educationList"
        :key="index"
        class="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ education.degree }}</h3>
              <p class="text-xl text-blue-600 dark:text-blue-400 mt-1">{{ education.institution }}</p>
            </div>
            <span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full mt-2 md:mt-0">
              {{ education.period }}
            </span>
          </div>

          <p class="text-gray-700 dark:text-gray-300 mb-4 text-lg">{{ education.description }}</p>

          <div v-if="education.skills && education.skills.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Skills</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(skill, skillIndex) in education.skills" 
                :key="skillIndex"
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-if="education.project" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
              <Icon name="mdi:certificate" class="mr-2 text-blue-500" />
              Final Year Project
            </h4>
            <p class="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              {{ education.project }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

educationalBackground.vue
```vue
<<<<<<< SEARCH
<script>
export default {
  name: "EducationalBackground",
  data() {
    return {
      educationList: [
        {
          degree: "Bachelors Of Computer Science (BCS)",
          institution: "Forman Christian College",
          period: "2016-2020",
          description: "Completed comprehensive computer science curriculum covering programming, algorithms, databases, and software engineering principles.",
          skills: ["Linux", "Bootstrap"],
          project: "Social Media Predictive Analytics System. Used Machine Learning and Predictive Analytics models to predict social media post reach."
        },
        {
          degree: "A'Levels",
          institution: "Beaconhouse Defence Campus Lahore",
          period: "2012-2014",
          description: "Completed advanced level studies with focus on science and mathematics.",
          skills: [],
          project: ""
        },
        {
          degree: "O'Levels",
          institution: "DHA Senior School For Boys Lahore",
          period: "2008-2012",
          description: "Completed secondary education with a strong foundation in mathematics and science.",
          skills: [],
          project: ""
        }
      ]
    };
  }
};
</script>
```

educationalBackground.vue
```vue
<<<<<<< SEARCH
<style scoped>
/* Using Tailwind classes instead of custom CSS */
</style>