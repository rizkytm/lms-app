<template>
  <AppLayout>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Welcome to Vue Auth App
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          A demo application showcasing Vue 3, Vite, Tailwind CSS, Vue Router
          and Pinia.
        </p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Features</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul class="list-disc pl-5 space-y-1">
                <li>User authentication (Login/Register)</li>
                <li>Protected routes with navigation guards</li>
                <li>State management with Pinia</li>
                <li>Styling with Tailwind CSS</li>
                <li>User profile management</li>
              </ul>
            </dd>
          </div>

          <div
            v-if="isLoggedIn"
            class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">User information</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <p>
                You are logged in as <strong>{{ user.name }}</strong> ({{
                  user.email
                }})
              </p>
              <router-link
                to="/profile"
                class="text-blue-600 hover:text-blue-800"
                >View your profile</router-link
              >
            </dd>
          </div>

          <div
            v-else
            class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Get started</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="space-x-4">
                <router-link
                  to="/login"
                  class="text-blue-600 hover:text-blue-800"
                  >Login</router-link
                >
                <span>or</span>
                <router-link
                  to="/register"
                  class="text-blue-600 hover:text-blue-800"
                  >Register</router-link
                >
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import AppLayout from '../components/AppLayout.vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
</script>
