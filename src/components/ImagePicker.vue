<script lang="ts" setup>
const model = defineModel<string>()

const { public: { pixabayApiKey } } = useRuntimeConfig()

const { data } = await useFetch<any>(`https://pixabay.com/api/?key=${pixabayApiKey}&image_type=photo&orientation=horizontal&per_page=32`)
</script>

<template>
  <ol v-if="data.hits" class="grid h-64 grid-cols-4 gap-2 p-2 overflow-x-auto overflow-y-auto">
    <li
      v-for="image in data.hits" :key="image.id"
      class="relative h-12 overflow-hidden rounded cursor-pointer outline outline-transparent focus:outline-blue-500 hover:outline-blue-500"
      :class="{ 'ring-2 ring-blue-500 shadow': model === image.largeImageURL }"
      @click="model = image.largeImageURL"
    >
      <NuxtImg
        :src="image.previewURL"
        class="absolute object-cover w-full h-full"
      />
    </li>
  </ol>
</template>

<style></style>
