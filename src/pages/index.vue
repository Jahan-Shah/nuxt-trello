<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

import type { BoardDocument } from '~/server/models/Board.model'

const { data: boards, refresh } = useFetch<BoardDocument[]>('/api/boards')

const showCreateBoard = ref(false)
const onCreate = () => {
  refresh()
  showCreateBoard.value = false
}
</script>

<template>
  <NuxtLayout name="protected">
    <template #actions>
      <UButton
        size="xs"
        @click="showCreateBoard = true"
      >
        Create board
      </UButton>
    </template>

    <div class="grid grid-cols-3 lg:grid-cols-4">
      <div
        v-for="board in boards"
        :key="board._id"
        class="rounded-lg border p-2 text-center shadow"
      >
        {{ board.name }}
      </div>
    </div>
    
    <USlideover v-model="showCreateBoard">
      <OverlayHeader
        title="Create a board"
        :on-click="() => (showCreateBoard = false)"
      />
      <div class="p-4">
        <FormBoard
          type="create"
          :on-create
        />
      </div>
    </USlideover>
  </NuxtLayout>
</template>
