<template>
  <v-footer
    class="vo-footer"
    height="40"
  >
    <div v-if="image || $slots.image" class="v-footer__image">
      <slot v-if="$slots.image" name="image" />

      <v-img v-else :src="image" position="left" cover />
    </div>

    <slot />
  </v-footer>
</template>

<script setup lang="ts">
  interface Props {
    image?: string
  }

  defineProps<Props>()
</script>

<style scoped lang="sass">
  .v-footer__image
    display: flex
    height: 40px
    flex: 1 1 auto
    left: 0
    overflow: hidden
    position: absolute
    top: 0
    width: 100%
    z-index: -1
</style>
