<script lang="ts" setup>
import type { BoardDocument } from '~/server/models/Board.model'

const props = defineProps<{ board: BoardDocument }>()

const emit = defineEmits<{
  onEdit: [board: BoardDocument]
}>()

const actions = ref([
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil',
      click: () => emit('onEdit', props.board),
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => { },
    },
  ],
])

const boardLink = computed(() => {
  return {
    name: 'boardId',
    params: {
      boardId: props.board._id,
    },
  }
})
</script>

<template>
  <div class="relative overflow-hidden rounded-lg shadow dark:bg-gray-800">
    <NuxtLink :to="boardLink" class="block w-full h-full">
      <div v-if="board.coverImage" class="h-36 w-full relative z-[1]">
        <NuxtImg :src="board.coverImage" :alt="board.name" class="h-full grid place-items-center w-full absolute object-cover z-[1]" />
      </div>
      <p class="absolute z-10 block font-semibold text-white top-2 left-4 pointer">
        {{ board.name }}
      </p>
      <div class="absolute top-0 w-full h-12 z-[1] bg-gradient-to-b from-black/90 to-transparent" />
    </NuxtLink>
    <UDropdown :items="actions" class="absolute z-10 p-1 rounded-full top-2 right-4 hover:bg-gray-200 dark:hover:bg-slate-700">
      <UIcon name="i-heroicons-cog-6-tooth" class="text-white" />
    </UDropdown>
  </div>
</template>
