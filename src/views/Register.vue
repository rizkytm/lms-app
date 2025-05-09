<template>
  <AppLayout>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="handleRegister">
            <div
              v-if="error"
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span class="block sm:inline">{{ error }}</span>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Full name</label
              >
              <div class="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  v-model="name"
                  class="input-field"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  v-model="email"
                  class="input-field"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  v-model="password"
                  class="input-field"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label
                for="password_confirmation"
                class="block text-sm font-medium text-gray-700"
                >Confirm password</label
              >
              <div class="mt-1">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  v-model="passwordConfirmation"
                  class="input-field"
                  placeholder="Confirm your password"
                />
              </div>
              <p v-if="passwordMismatch" class="mt-1 text-sm text-red-600">
                Passwords do not match
              </p>
            </div>

            <div>
              <button
                type="submit"
                class="w-full btn-primary"
                :disabled="loading || passwordMismatch"
              >
                <span v-if="loading">Creating account...</span>
                <span v-else>Create account</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AppLayout from '../components/AppLayout.vue';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const passwordMismatch = computed(() => {
  return (
    password.value &&
    passwordConfirmation.value &&
    password.value !== passwordConfirmation.value
  );
});

const handleRegister = async () => {
  if (passwordMismatch.value) return;

  if (
    await authStore.register(
      name.value,
      email.value,
      password.value,
      passwordConfirmation.value
    )
  ) {
    router.push('/profile');
  }
};
</script>
