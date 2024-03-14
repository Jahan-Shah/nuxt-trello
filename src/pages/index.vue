<script lang="ts" setup>
import type { BoardDocument } from '~/server/models/Board.model'

definePageMeta({
  middleware: 'auth',
})

const { data: boards, refresh } = await useFetch<BoardDocument[]>('/api/boards')

const showCreateBoard = ref(false)
const selectedBoard = ref<BoardDocument | undefined>()

const title = computed(() => selectedBoard.value ? 'Update board' : 'Create a board')
const type = computed(() => selectedBoard.value ? 'update' : 'create')

function onComplete() {
  refresh()
  showCreateBoard.value = false
}

function selectBoard(board: BoardDocument) {
  showCreateBoard.value = true
  selectedBoard.value = board
}

watch(showCreateBoard, (value) => {
  if (!value)
    selectedBoard.value = undefined
})
</script>

<template>
  <NuxtLayout name="protected">
    <template #actions>
      <UButton size="xs" @click="showCreateBoard = true">
        Create board
      </UButton>
    </template>

    <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
      <BoardCard
        v-for="board in boards"
        :key="board._id"
        :board
        @on-edit="selectBoard"
      />
    </div>

    <USlideover v-model="showCreateBoard">
      <OverlayHeader :title @on-click="showCreateBoard = false" />
      <div class="p-4">
        <BoardForm :type :initial-data="selectedBoard" @on-complete="onComplete" />
      </div>
    </USlideover>
  </NuxtLayout>
</template>
