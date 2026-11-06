<script lang="ts" setup>
import type { ActivityBarEmits, ActivityBarItem, ActivityBarProps } from './activity-bar.props'
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, toRef } from 'vue'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import Float from '../float/float.vue'
import Tooltip from '../tooltip/tooltip.vue'
import { useActivityBarStyle } from './activity-bar.style'

const props = withDefaults(defineProps<ActivityBarProps>(), { as: 'nav' })
const emits = defineEmits<ActivityBarEmits>()

const active = useVModel<ActivityBarProps, 'active', 'update:active'>(
  props,
  'active',
  emits,
  { defaultValue: props.defaultActive },
)

const groups = toRef(() => props.groups)

const contentGroups = computed(() => groups.value?.filter(group => group.slot === 'content'))
const footerGroups = computed(() => groups.value?.filter(group => group.slot === 'footer'))

const ui = useActivityBarStyle()

async function handleActiveChange(item: ActivityBarItem) {
  if (item.disabled) {
    return
  }

  if (item.onActive) {
    await item.onActive(item)
  }

  active.value = item.id
  emits('update:active', item.id)
}
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-slot="$attrs['data-slot'] || 'activity-bar'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <header v-if="!!$slots.header" :class="cn(ui.header(), props.ui?.header)">
      <slot name="header" />
    </header>

    <div :class="cn(ui.content(), props.ui?.content)">
      <slot name="content-top" />

      <template v-for="(group, gIdx) in contentGroups" :key="`content-${gIdx}`">
        <ul :class="cn(ui.group(), props.ui?.group)">
          <template v-for="(item, idx) in group.items" :key="`content-${gIdx}-${idx}`">
            <li>
              <Tooltip :content="item.tooltip || item.label" side="right" as-child>
                <button
                  type="button"
                  :data-active="toBoolDataAttrValue(active === item.id)"
                  :disabled="item.disabled"
                  :class="cn(ui.item(), props.ui?.item, item.class)"
                  @click="handleActiveChange(item)"
                >
                  <Float v-if="item.chipped" placement="top-right" offset="2px">
                    <span :class="cn(ui.itemChip(), props.ui?.itemChip)" />
                  </Float>
                  <AnimatedToggleIcon
                    v-if="item.icon"
                    :active="active === item.id"
                    :icon="item.icon"
                    :active-icon="item.activeIcon"
                  />
                </button>
              </Tooltip>
            </li>
          </template>
        </ul>
      </template>

      <slot name="content-bottom" />
    </div>

    <footer v-if="footerGroups && footerGroups.length > 0" :class="cn(ui.footer(), props.ui?.footer)">
      <template v-for="(group, gIdx) in footerGroups" :key="`footer-${gIdx}`">
        <ul :class="cn(ui.group(), props.ui?.group)">
          <template v-for="(item, idx) in group.items" :key="`footer-${gIdx}-${idx}`">
            <li>
              <Tooltip :content="item.tooltip || item.label" side="right" as-child>
                <button
                  type="button"
                  :data-active="toBoolDataAttrValue(active === item.id)"
                  :disabled="item.disabled"
                  :class="cn(ui.item(), props.ui?.item, item.class)"
                  @click="handleActiveChange(item)"
                >
                  <AnimatedToggleIcon
                    v-if="item.icon"
                    :active="active === item.id"
                    :icon="item.icon"
                    :active-icon="item.activeIcon"
                  />
                </button>
              </Tooltip>
            </li>
          </template>
        </ul>
      </template>
    </footer>
  </Primitive>
</template>
