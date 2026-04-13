<template>
  <v-app-bar
    app
    flat
    color="primary"
    dark
    height="70"
    class="elevation-4"
  >
    <v-container class="pa-0" fluid>
      <v-row justify="center" no-gutters class="fill-height">
        <v-col cols="12" md="10" lg="8" class="d-flex align-center px-4">
          <v-app-bar-nav-icon class="d-md-none white--text" @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>

          <v-icon large class="ml-2" color="white">mdi-cards-outline</v-icon>

          <v-toolbar-title class="font-weight-bold ml-2">
            <span class="accent--text">YGO</span>
            <span class="white--text">Database</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <div class="d-none d-md-flex align-center">
            <v-btn text @click="$emit('open-filters')">
              <v-icon left small>mdi-cards</v-icon>
              Cards
            </v-btn>
            <v-btn text @click="$emit('open-about')">
              <v-icon left small>mdi-information-outline</v-icon>
              Sobre
            </v-btn>
            <v-btn icon href="https://github.com/PriseTheSun/YGO-Database" target="_blank" class="mx-1">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon href="https://www.linkedin.com/in/deverikaraujo" target="_blank" class="mx-1">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>

          <SearchIconApp :search="search" class="ml-4 d-none d-md-flex" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import SearchIconApp from '@/components/atom/SearchIconApp'

export default {
  components:{
   SearchIconApp
  },
  props:{
    search:Function
  }
}
</script>

<style scoped>
.v-toolbar__title {
  font-size: 1.5rem;
  letter-spacing: 1px;
}
</style>
