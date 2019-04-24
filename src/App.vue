<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title v-if="!isSearch">
        <span>てりたまハンバーグ</span>
      </v-toolbar-title>
      <v-text-field v-else v-model="search" clearable label="検索" placeholder=" " hide-details />
      <v-spacer />
      <v-btn icon v-if="$route.path !== '/login'" @click="isSearch = true">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon v-if="$route.path !== '/login' && !isSearch" @click="$router.push('/')">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn v-if="isSearch" icon @click="isSearch = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content v-if="!isSearch">
      <router-view />
    </v-content>
    <v-content v-else>
      <Home :allow-add="false" :show-items="search && search.length > 0"/>
    </v-content>

    <v-snackbar v-model="refresh" color="red" :timeout="0">
      <div>更新があります. 更新ボタンを押してください</div>
      <v-btn outline @click="windowReload">
        更新
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';

export default {
  components: {
    Home,
  },
  name: 'App',
  data() {
    return {
      isSearch: false,
      search: '',
      refresh: false,
    };
  },
  mounted() {
    if (!window.updatefound) {
      window.updatefound.then((updated) => {
        this.refresh = updated;
      });
    }
  },
  methods: {
    windowReload() {
      window.location.reload(true);
    },
  },
}
</script>
