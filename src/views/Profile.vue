<template>
  <AppLayout>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and settings
          </p>
        </div>
        <button
          @click="isEditing = !isEditing"
          class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
      </div>

      <div
        v-if="error"
        class="border-t border-gray-200 px-4 py-3 bg-red-50 text-red-700"
        role="alert"
      >
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div class="border-t border-gray-200">
        <!-- View Mode -->
        <dl v-if="!isEditing" class="divide-y divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.name }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Account created</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ new Date().toLocaleDateString() }}
              <!-- In a real app this would come from user data -->
            </dd>
          </div>
        </dl>

        <!-- Edit Mode -->
        <div v-else class="py-6 px-4 sm:p-6">
          <form @submit.prevent="handleUpdateProfile">
            <div class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Full name</label
                >
                <div class="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    v-model="formData.name"
                    class="input-field"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model="formData.email"
                    class="input-field"
                    disabled
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="isEditing = false"
                  class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button type="submit" class="btn-primary" :disabled="loading">
                  <span v-if="loading">Saving...</span>
                  <span v-else>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import AppLayout from '../components/AppLayout.vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

const isEditing = ref(false);
const formData = ref({
  name: '',
  email: '',
});

onMounted(() => {
  // Initialize form data with user info
  formData.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
  };
});

const handleUpdateProfile = async () => {
  if (await authStore.updateProfile(formData.value)) {
    isEditing.value = false;
  }
};
</script>
