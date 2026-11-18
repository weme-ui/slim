<script setup lang="ts"></script>

<template>
  <Theme>
    <ToastProvider closeable>
      <div class="flex flex-wrap gap-6 h-screen flex-center">
        <RouterView />
      </div>
    </ToastProvider>
  </Theme>
</template>
