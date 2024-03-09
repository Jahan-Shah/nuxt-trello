<script lang="ts" setup>
import BoardSchema from '~/schemas/Board.schema';
import type { FormSubmitEvent } from '#ui/types'
import type { BoardDocument } from '~/server/models/Board.model';
import type { z } from 'zod';

interface Props {
  type: 'create' | 'update',
  initialData?: BoardDocument,
  onCreate?: () => void,
  onUpdate?: () => void,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'create',
  initialData: undefined,
  onCreate: undefined,
  onUpdate: undefined
})

const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined
})

const buttonTitle = computed(() => props.type === 'create' ? 'Create Board' : 'Update Board')
watchEffect(() => {
  if (props.type === 'update' && props.initialData) {
    formState.name = props.initialData.name
    formState.coverImage = props.initialData.coverImage
  }
})

const isLoading = ref(false)
async function handleForm(event: FormSubmitEvent<z.output<typeof BoardSchema>>) {
  try {
    isLoading.value = true
    await $fetch('/api/boards', {
      method: 'POST',
      body: event.data,
      watch: false
    })
    props.onCreate?.()
  } catch (e) {

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
    :state="formState"
    :schema="BoardSchema"
    @submit="handleForm"
  >
    <UFormGroup
      class="mb-4"
      name="name"
      label="Name"
    >
      <UInput v-model="formState.name" />
    </UFormGroup>
    <UButton
      :loading="isLoading"
      type="submit"
      block
    >
      {{ buttonTitle }}
    </UButton>
  </UForm>
</template>

<style></style>
