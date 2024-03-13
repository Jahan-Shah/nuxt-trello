<script lang="ts" setup>
import type { z } from 'zod'
import BoardSchema from '~/schemas/Board.schema'
import type { FormSubmitEvent } from '#ui/types'
import type { BoardDocument } from '~/server/models/Board.model'

interface Props {
  type: 'create' | 'update'
  initialData?: BoardDocument
}

const props = withDefaults(defineProps<Props>(), {
  type: 'create',
  initialData: undefined,
})

const emit = defineEmits(['onComplete'])

const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined,
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

    if (props.type === 'update' && props.initialData?._id) {
      await $fetch(`/api/boards/${props.initialData?._id}`, {
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
      await $fetch('/api/boards', {
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
  <UForm :state="formState" :schema="BoardSchema" @submit="handleForm">
    <UFormGroup class="mb-4" name="name" label="Name">
      <UInput v-model="formState.name" />
    </UFormGroup>
    <UFormGroup class="mb-4" name="coverImage" label="Cover Image">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup>

    <UButton :loading="isLoading" type="submit" block>
      {{ buttonTitle }}
    </UButton>
  </UForm>
</template>
