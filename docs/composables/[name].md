---
outline: deep
---

<script setup>
import { useData } from 'vitepress'

const { params } = useData()
</script>

<ComponentDoc :name="params.name" />
