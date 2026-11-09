<script lang="ts" setup>
import type { ToastStatus } from 'reka-ui'
import type { ToastData } from '../toast.props'
import { useToastManager } from 'reka-ui'
import { defineComponent, h } from 'vue'
import Button from '../../button/button.vue'
import ToastProvider from '../toast-provider.vue'

const ToastButtons = defineComponent({
  setup() {
    const toast = useToastManager<ToastData>()

    function showToast(status?: ToastStatus) {
      toast.add({
        title: 'Hello',
        description: 'This is a toast',
        status,
        data: {
          closable: false,
          actions: [
            {
              label: 'Action',
              onClick: () => {
                // eslint-disable-next-line no-alert
                alert('Action clicked')
              },
            },
          ],
        },
      })
    }

    function showLoadingToast() {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('Hello')
          }, 4000)
        }),
        {
          loading: {
            title: 'Loading',
            description: 'This is a loading toast',
            duration: 0,
            data: {
              loadingIcon: 'ri:loader-3-line',
            },
          },
          success: () => ({
            title: 'Success',
            description: 'This is a success toast',
          }),
          error: () => ({
            title: 'Error',
            description: 'This is an error toast',
          }),
        },
      )
    }

    return () =>
      h('div', { class: 'flex flex-wrap gap-6 items-center' }, [
        h(
          Button,
          {
            onClick: () => showToast(),
          },
          () => 'Default',
        ),
        h(
          Button,
          {
            onClick: () => showToast('info'),
          },
          () => 'Info',
        ),
        h(
          Button,
          {
            onClick: () => showToast('success'),
          },
          () => 'Success',
        ),
        h(
          Button,
          {
            onClick: () => showToast('warning'),
          },
          () => 'Warning',
        ),
        h(
          Button,
          {
            onClick: () => showToast('error'),
          },
          () => 'Error',
        ),
        h(Button, { onClick: showLoadingToast }, () => 'Promise'),
      ])
  },
})
</script>

<template>
  <ToastProvider closable>
    <ToastButtons />
  </ToastProvider>
</template>
