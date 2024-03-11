<script lang="ts" setup>
interface Props {
  title: string
}
defineProps<Props>()
</script>

<template>
  <div class="grid h-screen lg:grid-cols-2">
    <div class="w-full px-8 left place-self-center md:px-16 lg:px-24 xl:px-36 2xl:px-52">
      <div class="mb-6 text-center header">
        <div class="flex justify-center">
          <TheLogo>
            <div class="text-2xl font-bold">
              Nrello
            </div>
          </TheLogo>
        </div>
        <h1 class="mt-4 mb-8 text-xl font-bold">
          {{ title }}
        </h1>
      </div>
      <UCard>
        <slot />
      </UCard>
    </div>
    <div class="hidden right lg:block" />
  </div>
</template>

<style>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
