<template>
  <div class="home markdown-body mdReader-body" style="padding: 2rem">
    <READMEDEV />
  </div>
</template>

<script>
// @ is an alias to /src
import READMEDEV from '../../README_DEV.md'
export default {
  name: 'DevReadme',
  components: {
    READMEDEV
  }
}
</script>
