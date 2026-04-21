<template>
    <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <!-- Text Content -->
            <div class="flex flex-col justify-center">
                <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    Hi! I Am Hamza
                </h1>
                <p class="text-xl text-blue-600 dark:text-blue-400 mb-2">
                    Welcome To My Personal Portfolio Website!
                </p>

                <p class="text-gray-600 dark:text-gray-300 mt-6 mb-8 text-lg">
                    <strong>Backend / Platform Engineer</strong> with 4+ years of experience building scalable Node.js
                    systems across IoT, SaaS, and compliance-driven platforms. Specialized in high-throughput data
                    pipelines, multi-tenant architectures, and privacy frameworks (GDPR/CCPA). Proven ability to design
                    and deliver production systems handling 10K+ daily transactions, optimize performance, and lead
                    backend development in fast-paced environments.
                </p>

                <!-- Contact Info -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div class="flex items-center">
                        <Icon name="material-symbols:android-contacts" class="text-blue-500 mr-3" />
                        <span class="text-gray-700 dark:text-gray-300">Muhammad Hamza Butt</span>
                    </div>
                    <div class="flex items-center">
                        <Icon name="material-symbols:calendar-month" class="text-blue-500 mr-3" />
                        <span class="text-gray-700 dark:text-gray-300">19-06-1993</span>
                    </div>
                    <div class="flex items-center">
                        <Icon name="material-symbols:alternate-email" class="text-blue-500 mr-3" />
                        <span class="text-gray-700 dark:text-gray-300">hamza.b93@protonmail.com</span>
                    </div>
                    <div class="flex items-center">
                        <Icon name="material-symbols:smartphone" class="text-blue-500 mr-3" />
                        <span class="text-gray-700 dark:text-gray-300">+92-319-5040505</span>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="flex space-x-4">
                    <a href="https://bit.ly/4fdsGz0" target="_blank"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">
                        <Icon name="devicon:linkedin" width="32" height="32" />
                    </a>
                    <a href="https://bit.ly/4goh1P1" target="_blank"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">
                        <Icon name="skill-icons:github-light" width="32" height="32" />
                    </a>
                    <a href="https://bit.ly/3ZtN8pB" target="_blank"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">
                        <Icon name="devicon:gitlab" width="32" height="32" />
                    </a>
                    <a href="https://bit.ly/4gtaPW4" target="_blank"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors">
                        <Icon name="bi:sourceforge" class="text-gray-700 dark:text-gray-300" width="32" height="32" />
                    </a>
                </div>
            </div>

            <!-- Image -->
            <div class="flex items-center justify-center">
                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse">
                    </div>
                    <img alt="Profile picture of Hamza"
                        class="relative rounded-full w-64 h-64 object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                        src="../public/1589652394983.png" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="js">
export default {
    name: "Bio"
};
</script>

<style lang="css" scoped>
/* Removed old styles for a cleaner approach using Tailwind */
</style>
