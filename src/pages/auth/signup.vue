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
        <UInput v-model="formState.password" type="password" placeholder="Enter your password" />
      </UFormGroup>
      <UFormGroup name="confirmPassword" label="Confirm Password">
        <UInput v-model="formState.confirmPassword" type="password" placeholder="Enter your password again" />
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
