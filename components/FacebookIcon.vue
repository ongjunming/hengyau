<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 24,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.55 21v-8h2.7l.4-3.12h-3.1v-2c0-.9.25-1.52 1.55-1.52h1.66V3.57c-.29-.04-1.27-.12-2.42-.12-2.4 0-4.04 1.46-4.04 4.15v2.28H7.58V13h2.72v8h3.25Z" />
  </svg>
</template>
