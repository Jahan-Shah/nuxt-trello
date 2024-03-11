<script setup lang="ts">
import type { z } from 'zod'
import SigninSchema from '~/schemas/Signin.schema'
import type { FormSubmitEvent } from '#ui/types'

const isLoading = ref(false)

const formState = reactive({
  email: undefined,
  password: undefined,
})

const { signIn } = useAuth()

async function handleSignIn(event: FormSubmitEvent<z.output<typeof SigninSchema>>) {
  try {
    isLoading.value = true
    // @ts-expect-error: Dep Error
    const { error } = await signIn('credentials', {
      redirect: false,
      email: event.data.email,
      password: event.data.password,
    })
    if (!error)
      useRouter().push('/')
  }
  catch (e) {

  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <NuxtLayout name="auth" title="Login to your account">
    <UForm class="flex flex-col gap-4" :state="formState" :schema="SigninSchema" @submit="handleSignIn">
      <UFormGroup name="email" label="Email">
        <UInput v-model="formState.email" type="email" placeholder="Enter your email" />
      </UFormGroup>
      <UFormGroup name="password" label="Password">
        <UInput v-model="formState.password" trailing type="password" placeholder="Enter your password" />
      </UFormGroup>

      <UButton :loading="isLoading" type="submit" block>
        Sign In
      </UButton>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Doesn't have an account?
        <NuxtLink to="/auth/signup" class="text-white">
          Sign Up
        </NuxtLink>
      </p>
    </UForm>
  </NuxtLayout>
</template>

<style>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
