<script lang="ts" setup>
import type { BoardDocument } from '~/server/models/Board.model'

definePageMeta({
  middleware: 'auth',
})

const { data: boards, refresh } = useFetch<BoardDocument[]>('/api/boards')

const showCreateBoard = ref(false)
const selectedBoard = ref<BoardDocument | undefined>()

const title = computed(() => selectedBoard.value ? 'Update Board' : 'Create a board')
const type = computed(() => selectedBoard.value ? 'update' : 'create')

function onComplete() {
  refresh()
  showCreateBoard.value = false
}

function selectBoard(board: BoardDocument) {
  showCreateBoard.value = true
  selectedBoard.value = board
}

function createBoard() {
  showCreateBoard.value = true
}

watch(showCreateBoard, (value) => {
  if (!value)
    selectedBoard.value = undefined
})
</script>

<template>
  <NuxtLayout name="protected">
    <template #actions>
      <UButton size="xs" @click="createBoard">
        Create board
      </UButton>
    </template>

    <div class="grid grid-cols-3 gap-4 lg:grid-cols-4">
      <TheBoard
        v-for="board in boards"
        :key="board._id"
        :board
        @click="selectBoard(board)"
      />
    </div>

    <USlideover v-model="showCreateBoard">
      <OverlayHeader :title @on-click="showCreateBoard = false" />
      <div class="p-4">
        <FormBoard :type :initial-data="selectedBoard" @on-complete="onComplete" />
      </div>
    </USlideover>
  </NuxtLayout>
</template>
