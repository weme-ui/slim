<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-6 h-screen flex-center">
    <Alert title="This is an info alert" variant="solid" class="w-100" closable />
    <Alert title="Success" description="This is an success alert" variant="soft" status="success" href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="w-100" />
    <Alert title="Warning" description="This is an warning alert" variant="outline" status="warning" href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="w-100" />
    <Alert title="Error" description="This is an error alert" variant="inverse" status="error" href="https://www.google.com" target="_blank" rel="noopener noreferrer" class="w-100" />
  </div>
</template>
