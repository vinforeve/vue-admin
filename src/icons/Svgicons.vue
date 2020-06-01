<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
import { reactive, ref, onMounted} from "@vue/composition-api"
export default {
  name: "svgIcons",
  setup(props,context) {
    const msg = ref("测试一下");
    return {
      msg
    }
  }
}
</script>

<style lang="scss" scoped>

</style>