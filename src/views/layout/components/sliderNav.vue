<template>
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>

    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoutes.length > 1">
        <a-breadcrumb-item>{{
          currentRoutes[0] ?
          currentRoutes[0].meta.title : ''
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>
            {{ currentRoutes[1] ? currentRoutes[1].meta.title : '' }}
          </a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li class="user-name">
        {{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="login-out" @click="logout">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      this.currentRoutes = this.$router.currentRoute.matched;
    },
  },
  data() {
    return {
      currentRoutes: this.$router.currentRoute.matched,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style>
</style>
