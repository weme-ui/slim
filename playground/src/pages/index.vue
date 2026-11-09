<script lang="ts" setup>
import type { ToastStatus } from 'reka-ui'
import type { ToastData } from '~/components/toast/toast.props'
import { useToastManager } from 'reka-ui'

const toast = useToastManager<ToastData>()

function showToast(status?: ToastStatus) {
  toast.add({
    title: 'Hello',
    description: 'This is a toast',
    status,
    data: {
      closeable: false,
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
</script>

<template>
  <Button @click="showToast()"> Default </Button>

  <Button @click="showToast('info')"> Info </Button>

  <Button @click="showToast('success')"> Success </Button>

  <Button @click="showToast('warning')"> Warning </Button>

  <Button @click="showToast('error')"> Error </Button>

  <Button @click="showLoadingToast"> Promise </Button>
</template>
