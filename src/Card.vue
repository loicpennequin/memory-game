<script setup lang="ts">
import { SHAPES } from './constants';

const props = defineProps<{ card: Card }>();

const color = computed(() => `var(--color-${props.card.color})`);
</script>

<template>
  <svg viewBox="0 0 100 100">
    <title>{{ props.card.color }} {{ props.card.shape }}</title>

    <circle
      cx="50"
      cy="50"
      r="40"
      stroke-width="8"
      v-if="props.card.shape === SHAPES[0]"
    />
    <rect
      x="10"
      y="10"
      width="80"
      height="80"
      stroke-width="8"
      v-else-if="props.card.shape === SHAPES[1]"
    />

    <polygon
      points="50,15 90,85 10,85"
      stroke-width="8"
      v-else-if="props.card.shape === SHAPES[2]"
    />
  </svg>
</template>

<style scoped>
svg {
  stroke: v-bind('props.card.filled ? null : color');
  fill: v-bind('props.card.filled ? color : "transparent"');
}
</style>
