<script setup>
import { RouterView } from "vue-router";
import Title from "./components/Title.vue";
</script>
<template>
  <a-layout>
    <a-layout-header class="header">
      <img
        alt="Logo Plan Marketing"
        class="logo"
        src="@/assets/logo-plan-marketing.jpeg"
        width="125"
        height="125"
      />
      <Title msg="Plan Marketing Test" />
    </a-layout-header>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
    <a-layout-footer>
      <div style="float: right">
        <RouterLink :to="{ path: 'create/' }">
          <a-button type="primary">Cadastrar produto</a-button>
        </RouterLink>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.header {
  height: 130px;
  display: inline-flex;
}
.logo {
  padding: 30px;
}
</style>
