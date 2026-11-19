<script setup lang="ts"></script>

<template>
  <ThemeProvider>
    <ToastProvider closeable>
      <div class="flex flex-wrap gap-6 h-screen flex-center">
        <RouterView />
      </div>
    </ToastProvider>
  </ThemeProvider>
</template>
