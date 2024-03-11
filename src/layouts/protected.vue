<script lang="ts" setup>
const { data, signOut } = useAuth()

const dropdownItems = ref([
  [
    {
      label: 'Profile',
      slot: 'profile',
      disabled: true,
    },
  ],
  [
    {
      label: 'Billing',
      icon: 'i-heroicons-credit-card',
      click: () => { },
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      click: handleSignOut,
    },
  ],
])

async function handleSignOut() {
  await signOut()
}
</script>

<template>
  <div>
    <header class="p-2 bg-white border-b dark:border-gray-700 dark:bg-gray-800">
      <UContainer>
        <div class="flex justify-between">
          <NuxtLink to="/">
            <TheLogo class="w-8 h-8">
              <div class="text-xl font-bold">
                Nrello
              </div>
            </TheLogo>
          </NuxtLink>
          <div class="inline-flex items-center justify-end gap-4">
            <slot name="actions" />
            <ColorSwitcher />
            <UDropdown :items="dropdownItems">
              <UIcon name="i-heroicons-user-circle" class="w-6 h-6" />
              <template #profile>
                <div class="text-left truncate">
                  <p>Signed in as</p>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </header>
    <main class="my-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
