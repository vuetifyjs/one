<template>
  <div :id="id" ref="rootEl" />
</template>

<script setup lang="ts">
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    scriptId: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['script:error', 'script:load'])

  const rootEl = ref<HTMLElement>()
  const scriptEl = ref<HTMLScriptElement>()

  onBeforeMount(async () => {
    // if (typeof window === undefined) return

    const script = document.createElement('script')
    const onError = () => emit('script:error')

    script.type = 'text/javascript'
    script.id = props.scriptId
    script.src = props.src
    script.addEventListener('load', () => emit('script:load'))
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    script.onerror = onError

    scriptEl.value = script
  })

  onMounted(() => {
    if (scriptEl.value && rootEl.value) {
      rootEl.value.append(scriptEl.value)
    }
  })

  onBeforeUnmount(() => {
    if (scriptEl.value && rootEl.value) {
      scriptEl.value.remove()
    }
  })
</script>
