<template>
  <v-text-field
    v-model="searchText"
    @input="onSearch"
    label="Buscar carta..."
    prepend-inner-icon="mdi-magnify"
    color="secondary"
    dense
    outlined
    hide-details
    clearable
    class="search-field"
    style="max-width: 300px;"
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchIconApp',
  props: {
    search: Function,
  },
  data() {
    return {
      searchText: '',
      debounceTimer: null,
    };
  },
  methods: {
    onSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        if (this.search) {
          this.search(this.searchText || '');
        }
      }, 300);
    },
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer);
  },
};
</script>

<style scoped>
.search-field {
  font-size: 14px;
}
</style>
