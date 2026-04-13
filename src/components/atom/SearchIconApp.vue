<template>
  <v-autocomplete
    v-model="selectedItem"
    :search-input.sync="searchText"
    :items="previewItems"
    :loading="isLoading"
    item-text="name"
    item-value="name"
    label="Buscar carta..."
    prepend-inner-icon="mdi-magnify"
    color="secondary"
    dense
    outlined
    hide-details
    clearable
    hide-no-data
    no-filter
    :menu-props="{ maxHeight: '350px' }"
    class="search-field"
    style="max-width: 300px;"
  >
    <template v-slot:item="data">
      <v-list-item-avatar rounded size="40">
        <v-img :src="data.item.card_images[0].image_url_small" contain></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">{{ data.item.name }}</v-list-item-title>
        <v-list-item-subtitle class="text-caption grey--text">{{ data.item.type }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
    <template v-slot:prepend-item>
      <div v-if="previewItems.length > 0" class="text-center pa-2 text-caption grey--text sticky-header" style="border-bottom: 1px solid #eee;">
        Mostrando {{ previewItems.length }} de {{ totalResults }} resultados
      </div>
      <div v-else-if="searchText && searchText.length >= 3 && !isLoading" class="text-center pa-2 text-caption grey--text sticky-header">
        Nenhum resultado encontrado
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'SearchIconApp',
  props: {
    search: Function,
  },
  data() {
    return {
      selectedItem: null,
      searchText: '',
      previewItems: [],
      totalResults: 0,
      isLoading: false,
      debounceTimer: null,
    };
  },
  watch: {
    searchText(val) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        if (this.search) {
          this.search(val || '');
        }

        if (!val || val.length < 3) {
          this.previewItems = [];
          this.totalResults = 0;
          return;
        }

        this.isLoading = true;
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&fname=${encodeURIComponent(val)}`)
          .then(res => res.json())
          .then(res => {
            if (res.data) {
              this.totalResults = res.data.length;
              this.previewItems = res.data.slice(0, 30);
            } else {
              this.previewItems = [];
              this.totalResults = 0;
            }
          })
          .catch(() => {
            this.previewItems = [];
            this.totalResults = 0;
          })
          .finally(() => {
            this.isLoading = false;
          });
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
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: white;
}
</style>
