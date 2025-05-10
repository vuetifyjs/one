// Utilities
import type { RouteParams } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// https://github.com/vuejs/router/issues/1160#issuecomment-1055276586
export function useQuery<P extends RouteParams> () {
  const route = useRoute()

  return computed(
    () => route.query as P,
  )
}

// https://github.com/vuejs/router/issues/1160#issuecomment-1055276586
export function useParams<P extends RouteParams> () {
  const route = useRoute()

  return computed(
    () => route.params as P,
  )
}
