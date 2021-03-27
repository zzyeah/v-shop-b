<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
      $router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : ''
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
    <template
    v-for="route in $store.state.menuRoutes"
    >
      <a-sub-menu
      :key="route.name"
      v-if="!route.meta.hidden"
      >
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item
        v-for="child in route.children"
        :key="child.name"
        >
        <router-link :to="{name: child.name}">
          <a-icon :type="child.meta.icon"></a-icon>
          {{ child.meta.title }}
        </router-link>
        </a-menu-item>
      </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  created() {
  },
};
</script>

<style>
</style>
