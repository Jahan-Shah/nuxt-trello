<script lang="ts" setup>
defineProps<{
  title: string
}>()

defineEmits(['onClick'])
</script>

<template>
  <div class="flex items-center justify-between px-4 py-2 border-b dark:border-gray-800">
    <h3 class="font-semibold">
      {{ title }}
    </h3>
    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="$emit('onClick')" />
  </div>
</template>
