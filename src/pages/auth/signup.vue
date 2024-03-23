<script lang="ts" setup>
import type { z } from 'zod'
import SignupSchema from '~/schemas/Signup.schema'
import type { FormSubmitEvent } from '#ui/types'

const isLoading = ref(false)

const formState = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const toast = useToast()
async function handleSignUp(event: FormSubmitEvent<z.output<typeof SignupSchema>>) {
  try {
    isLoading.value = true
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(event.data),
      watch: false,
    })

    toast.add({
      title: 'Account created!',
      description: 'Your account has been created successfully. Redirecting you to the sign in page',
      timeout: 5000,
    })

    useRouter().push({
      name: 'auth-signin',
    })
  }
  catch (e: any) {
    toast.add({
      title: 'Failed to create account!',
      description: e.message || 'An error occurred while creating your account. Please try again later.',
    })
  }
  finally {
    isLoading.value = false
  }
}

const showPassword = ref(false)
const passwordType = computed(() => showPassword.value ? 'text' : 'password')
function togglePassword() {
  showPassword.value = !showPassword.value
}

const showConfirmPassword = ref(false)
const confirmPasswordType = computed(() => showConfirmPassword.value ? 'text' : 'password')
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <NuxtLayout name="auth" title="Create a free account">
    <UForm class="flex flex-col gap-4" :state="formState" :schema="SignupSchema" @submit="handleSignUp">
      <UFormGroup name="name" label="Name">
        <UInput v-model="formState.name" placeholder="Enter your name" />
      </UFormGroup>
      <UFormGroup name="email" label="Email">
        <UInput v-model="formState.email" type="email" placeholder="Enter your email" />
      </UFormGroup>
      <UFormGroup name="password" label="Password">
        <UInput v-model="formState.password" :type="passwordType" placeholder="Enter your password">
          <template #trailing>
            <div class="icons cursor-pointer z-[2] pointer-events-auto" @click="togglePassword">
              <Transition name="slide-up" mode="out-in">
                <UIcon v-if="showPassword" name="i-heroicons-eye" />
                <UIcon v-else name="i-heroicons-eye-slash" />
              </Transition>
            </div>
          </template>
        </UInput>
      </UFormGroup>
      <UFormGroup name="confirmPassword" label="Confirm Password">
        <UInput v-model="formState.confirmPassword" :type="confirmPasswordType" placeholder="Enter your password again">
          <template #trailing>
            <div class="icons cursor-pointer z-[2] pointer-events-auto" @click="toggleConfirmPassword">
              <Transition name="slide-up" mode="out-in">
                <UIcon v-if="showConfirmPassword" name="i-heroicons-eye" />
                <UIcon v-else name="i-heroicons-eye-slash" />
              </Transition>
            </div>
          </template>
        </UInput>
      </UFormGroup>

      <UButton :loading="isLoading" type="submit" block>
        Create Account
      </UButton>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/signin" class="text-white">
          Sign in
        </NuxtLink>
      </p>
    </UForm>
  </NuxtLayout>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 50ms ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
