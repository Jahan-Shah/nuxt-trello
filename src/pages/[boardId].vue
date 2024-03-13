<script lang="ts" setup>
import type { ObjectId } from 'mongoose'
import type { ListDocument } from '~/server/models/List.model'

definePageMeta({
  middleware: 'auth',
})

const { boardId } = useRoute().params
const { data, refresh } = useFetch(`/api/boards/${boardId}`)

const showCreateList = ref(false)
const selectedList = ref<ListDocument | undefined>()

const title = computed(() => selectedList.value ? 'Update list' : 'Create a list')
const type = computed(() => selectedList.value ? 'update' : 'create')

function onComplete() {
  refresh()
  showCreateList.value = false
}
</script>

<template>
  <NuxtLayout name="protected">
    <template #actions>
      <UButton size="xs" @click="showCreateList = true">
        Create list
      </UButton>
    </template>
    <pre>
      {{ data }}
    </pre>

    <USlideover v-model="showCreateList">
      <OverlayHeader :title @on-click="showCreateList = false" />
      <div class="p-4">
        <ListForm :type :board-id :initial-data="selectedList" @on-complete="onComplete" />
      </div>
    </USlideover>
  </NuxtLayout>
</template>

<style>

</style>
