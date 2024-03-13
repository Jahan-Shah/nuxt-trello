<script lang="ts" setup>
import type { z } from 'zod'
import type { ObjectId } from 'mongoose'
import ListSchema from '~/schemas/List.schema'
import type { FormSubmitEvent } from '#ui/types'
import type { ListDocument } from '~/server/models/List.model'

interface Props {
  type: 'create' | 'update'
  boardId: ObjectId | string | string[]
  initialData?: ListDocument
}

const props = withDefaults(defineProps<Props>(), {
  type: 'create',
  initialData: undefined,
})

const emit = defineEmits(['onComplete'])

const formState = reactive<Partial<ListDocument>>({
  name: undefined,
  board: props.boardId as ObjectId,
})

const buttonTitle = computed(() => props.type === 'create' ? 'Create List' : 'Update List')
watchEffect(() => {
  if (props.type === 'update' && props.initialData)
    formState.name = props.initialData.name
})

const isLoading = ref(false)
async function handleForm(event: FormSubmitEvent<z.output<typeof ListSchema>>) {
  try {
    isLoading.value = true

    if (props.type === 'update' && props.initialData?._id) {
      await $fetch(`/api/lists/${props.initialData?._id}`, {
        method: 'PUT',
        body: event.data,
        watch: false,
      })

      useToast().add({
        title: 'Board updated',
        description: 'Board has been updated successfully',
      })
    }

    else {
      await $fetch('/api/lists', {
        method: 'POST',
        body: event.data,
        watch: false,
      })

      useToast().add({
        title: 'Board created!',
        description: 'Board has been created successfully',
      })
    }

    emit('onComplete')
  }
  catch (e) {

  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm :state="formState" :schema="ListSchema" @submit="handleForm">
    <UFormGroup class="mb-4" name="name" label="Name">
      <UInput v-model="formState.name" />
    </UFormGroup>

    <UButton :loading="isLoading" type="submit" block>
      {{ buttonTitle }}
    </UButton>
  </UForm>
</template>
