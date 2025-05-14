/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import type { IconProps } from 'vuetify'

import { camelize, h } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import { aliases as oneAliases } from '@/icons'
import * as mdiSvg from './icons'
// Styles
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    AppChip: components.VChip,
  },
  components: {
    VIconBtn,
  },
  defaults: {
    global: {
      hideDetails: 'auto',
    },
    AppChip: {
      size: 'x-small',
      label: true,
      variant: 'outlined',
    },
    VBtn: {
      class: 'text-none',
    },
    VChip: {
      variant: 'outlined',
      VIcon: {
        size: 'small',
      },
    },
    VContainer: {
      fluid: true,
    },
    VDataTable: {
      density: 'compact',
      hover: true,
    },
    VField: {
      variant: 'outlined',

      VIcon: {
        size: 'x-small',
      },
    },
    VNumberInput: {
      density: 'compact',
      variant: 'outlined',
    },
    VTextField: {
      density: 'compact',
      variant: 'outlined',
    },
    VSelect: {
      density: 'compact',
      variant: 'outlined',
    },
    VTextarea: {
      density: 'compact',
      variant: 'outlined',
    },
    VAutocomplete: {
      density: 'compact',
      variant: 'outlined',
    },
    VFileInput: {
      density: 'compact',
      variant: 'outlined',
      prependIcon: '',
      prependInnerIcon: '$file',
    },
    VSwitch: {
      color: 'primary',
      density: 'compact',
      inset: true,
    },
    VDatePicker: {
      hideHeader: true,
    },
    VDatePickerControls: {
      VBtn: {
        color: undefined,
      },
    },
    VToolbar: {
      color: 'surface-light',
      class: 'px-2',
    },
    VAppBar: {
      color: 'surface',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      ...oneAliases,
    },
    sets: {
      mdiSvg: mdi,
      mdi: {
        component: (props: IconProps) => {
          const icon = mdiSvg[camelize(props.icon as string) as keyof typeof mdiSvg]

          return h(components.VSvgIcon, {
            ...props,
            icon,
          })
        },
      },
    },
  },
})
