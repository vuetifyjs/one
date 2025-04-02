/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// Composables
import { createVuetify, IconProps } from 'vuetify'
import * as components from 'vuetify/components'
import { camelize, h } from 'vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as mdiSvg from './icons'
import { aliases as oneAliases } from '@/../lib/icons'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    AppChip: components.VChip,
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
    VContainer: {
      fluid: true,
    },
    VDataTable: {
      density: 'compact',
      hover: true,
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

          return h(components.VSvgIcon, { ...props, icon })
        },
      },
    },
  },
})
