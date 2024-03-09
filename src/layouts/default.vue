<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'bg-gray-100 dark:bg-gray-900',
  },
})
</script>

<template>
  <div>
    <slot />
    <UNotifications />
  </div>
</template>
