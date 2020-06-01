<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu
          v-if="!item.hidden"
          :key="item.id"
          :index="index + ''"
        >
          <!-- 一级菜单 -->
          <template slot="title">
          <!-- 
          
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
          -->
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item
              v-if="!subItem.hidden"
              :key="subItem.id"
              :index="subItem.path"
            >
              {{ subItem.meta.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <svg-icons></svg-icons>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
      定义数据
    */
    const isCollapse = ref(false);

    // console.log(root.$router.options.routes);
    const routers = reactive(root.$router.options.routes);

    /**
      定义函数
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}
.el-menu {
  border: none;
}
</style>