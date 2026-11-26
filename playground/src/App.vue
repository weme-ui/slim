<script setup lang="ts"></script>

<template>
  <ConfigProvider>
    <ThemeProvider>
      <ToastProvider closeable>
        <div class="flex flex-wrap gap-6 h-screen flex-center">
          <RouterView />
        </div>
      </ToastProvider>
    </ThemeProvider>
  </ConfigProvider>
</template>
