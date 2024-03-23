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

const showPassword = ref(false)
const passwordType = computed(() => showPassword.value ? 'text' : 'password')
function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <NuxtLayout name="auth" title="Login to your account">
    <UForm class="flex flex-col gap-4" :state="formState" :schema="SigninSchema" @submit="handleSignIn">
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
