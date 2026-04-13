<template>
  <v-container fluid class="grid-section pa-0" id="cards">
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8" class="px-4 py-8">
        <v-row class="mb-6">
          <v-col cols="12">
          <div class="section-header text-center mb-6">
            <h2 class="text-h3 font-weight-bold mb-2">
              <v-icon large color="secondary" class="mr-2">mdi-cards</v-icon>
              Coleção de Cartas
            </h2>
            <p class="text-body-1 grey--text">
              Explore nosso banco de dados com mais de {{ total }} cartas
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-4 align-center justify-center">
        <v-col cols="auto" class="d-flex gap-3 flex-wrap justify-center">
          <v-btn
            outlined
            color="secondary"
            large
            @click="filterDialog = true"
          >
            <v-icon left>mdi-filter-variant</v-icon>
            Filtros
            <v-badge
              v-if="activeFilterCount > 0"
              :content="activeFilterCount"
              color="error"
              inline
              class="ml-2"
            ></v-badge>
          </v-btn>
          <v-select
            v-model="cardsPerPage"
            :items="[12, 24, 48, 96]"
            label="Cards por página"
            outlined
            dense
            hide-details
            color="secondary"
            style="max-width: 180px"
            @change="updatePerPage"
          />
        </v-col>
      </v-row>

      <v-row v-if="activeFilterCount > 0" class="mb-4">
        <v-col cols="12" class="d-flex flex-wrap justify-center">
          <v-chip
            v-if="selectedType"
            close
            @click:close="selectedType = null; filterCards()"
            color="secondary"
            dark
            class="mr-2 mb-1"
          >
            Tipo: {{ selectedType }}
          </v-chip>
          <v-chip
            v-if="selectedArchetype"
            close
            @click:close="selectedArchetype = null; filterCards()"
            color="info"
            dark
            class="mr-2 mb-1"
          >
            Arquétipo: {{ selectedArchetype }}
          </v-chip>
          <v-chip
            v-if="selectedAttributes.length > 0"
            close
            @click:close="selectedAttributes = []; filterCards()"
            color="primary"
            dark
            class="mb-1"
          >
            Atributos: {{ selectedAttributes.length }} selecionados
          </v-chip>
        </v-col>
      </v-row>

      <div v-if="loading" class="text-center py-12">
        <v-progress-circular
          indeterminate
          color="secondary"
          size="64"
        />
        <p class="mt-4 grey--text">Carregando cartas...</p>
      </div>

      <template v-else>
        <v-row v-if="cards.length > 0">
          <v-col
            v-for="card in cards"
            :key="card.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <card-image :card="card" />
          </v-col>
        </v-row>

        <v-row v-else class="text-center py-12">
          <v-col cols="12">
            <v-icon size="64" color="grey">mdi-cards-outline</v-icon>
            <h3 class="text-h5 grey--text mt-4">Nenhuma carta encontrada</h3>
            <p class="grey--text">Tente ajustar seus filtros de busca</p>
            <v-btn color="secondary" class="mt-4" @click="clearFilters">
              Limpar Filtros
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="cards.length > 0" class="text-center mt-8">
          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="7"
            color="secondary"
            @input="changeIndex"
            class="custom-pagination"
          ></v-pagination>
          <p class="mt-3 grey--text text-caption">
            Mostrando {{ (currentIdx - 1) * perPage + 1 }} - {{ Math.min(currentIdx * perPage, total) }} de {{ total }} cartas
          </p>
        </div>
      </template>
      </v-col>
    </v-row>

    <v-dialog v-model="filterDialog" max-width="700">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left color="white">mdi-filter-variant</v-icon>
          Filtros Avançados
          <v-spacer></v-spacer>
          <v-btn icon dark @click="filterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-subtitle-1 font-weight-bold mb-3 secondary--text">
                <v-icon small class="mr-1">mdi-shape</v-icon>
                Tipo de Carta
              </h4>
              <v-select
                v-model="selectedType"
                :items="cardTypes"
                item-text="text"
                item-value="value"
                label="Selecione o tipo"
                outlined
                dense
                clearable
                hide-details
                color="secondary"
                class="mb-4"
              />
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-subtitle-1 font-weight-bold mb-3 secondary--text">
                <v-icon small class="mr-1">mdi-shield</v-icon>
                Arquétipo
              </h4>
              <v-select
                v-model="selectedArchetype"
                :items="archetypes"
                label="Selecione o arquétipo"
                outlined
                dense
                clearable
                hide-details
                color="secondary"
                class="mb-4"
              />
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <h4 class="text-subtitle-1 font-weight-bold mb-3 secondary--text">
            <v-icon small class="mr-1">mdi-star</v-icon>
            Atributos
          </h4>
          <v-row>
            <v-col cols="6" sm="4" md="3" v-for="attr in attributes" :key="attr.value">
              <v-checkbox
                v-model="selectedAttributes"
                :value="attr.value"
                :label="attr.label"
                color="secondary"
                hide-details
                dense
              >
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <v-icon small :color="attr.color" class="mr-1">{{ attr.icon }}</v-icon>
                    {{ attr.label }}
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <h4 class="text-subtitle-1 font-weight-bold mb-3 secondary--text">
            <v-icon small class="mr-1">mdi-cards</v-icon>
            Tipo de Monstro
          </h4>
          <v-row>
            <v-col cols="6" sm="4" md="3" v-for="monsterType in monsterTypes" :key="monsterType">
              <v-checkbox
                v-model="selectedMonsterTypes"
                :value="monsterType"
                :label="monsterType"
                color="primary"
                hide-details
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="filter-actions">
          <v-btn :icon="isMobile" text color="error" @click="clearFilters">
            <v-icon left>mdi-delete</v-icon>
            <span v-if="!isMobile">Limpar Tudo</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :icon="isMobile" text @click="filterDialog = false">
            <v-icon left>mdi-close</v-icon>
            <span v-if="!isMobile">Cancelar</span>
          </v-btn>
          <v-btn :icon="isMobile" color="secondary" dark @click="applyFilters">
            <v-icon left>mdi-check</v-icon>
            <span v-if="!isMobile">Aplicar Filtros</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CardImage from "@/components/molecules/CardImage.vue";

export default {
  props: {
    search: String,
  },
  watch: {
    search: function () {
      this.filterCards();
    },
  },

  data() {
    return {
      originalCards: [],
      cards: [],
      cardsSearched: [],
      total: 0,
      perPage: 12,
      cardsPerPage: 12,
      currentIdx: 1,
      page: 1,
      loading: true,
      filterDialog: false,
      selectedType: null,
      selectedArchetype: null,
      selectedAttributes: [],
      selectedMonsterTypes: [],
      cardTypes: [
        { text: 'Monster', value: 'Monster' },
        { text: 'Spell Card', value: 'Spell Card' },
        { text: 'Trap Card', value: 'Trap Card' },
        { text: 'Normal Monster', value: 'Normal Monster' },
        { text: 'Effect Monster', value: 'Effect Monster' },
        { text: 'Fusion Monster', value: 'Fusion Monster' },
        { text: 'XYZ Monster', value: 'XYZ Monster' },
        { text: 'Synchro Monster', value: 'Synchro Monster' },
        { text: 'Link Monster', value: 'Link Monster' },
        { text: 'Pendulum Monster', value: 'Pendulum Monster' },
        { text: 'Ritual Monster', value: 'Ritual Monster' },
        { text: 'Token', value: 'Token' },
      ],
      attributes: [
        { value: 'DARK', label: 'DARK', icon: 'mdi-eye', color: '#5D3F6A' },
        { value: 'LIGHT', label: 'LIGHT', icon: 'mdi-white-balance-sunny', color: '#F5E657' },
        { value: 'FIRE', label: 'FIRE', icon: 'mdi-fire', color: '#E86D3B' },
        { value: 'WATER', label: 'WATER', icon: 'mdi-water', color: '#3B8DE6' },
        { value: 'EARTH', label: 'EARTH', icon: 'mdi-rock', color: '#8B9A46' },
        { value: 'WIND', label: 'WIND', icon: 'mdi-weather-windy', color: '#7EC8E3' },
      ],
      monsterTypes: [
        'Normal',
        'Effect',
        'Fusion',
        'XYZ',
        'Synchro',
        'Link',
        'Pendulum',
        'Ritual',
        'Spirit',
        'Tuner',
        'Union',
        'Gemini',
        'Flip',
        'Toon',
      ],
      archetypes: [],
    };
  },
  components: {
    CardImage,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    totalPages() {
      return Math.ceil(this.cardsSearched.length / this.perPage);
    },
    activeFilterCount() {
      let count = 0;
      if (this.selectedType) count++;
      if (this.selectedArchetype) count++;
      count += this.selectedAttributes.length;
      count += this.selectedMonsterTypes.length;
      return count;
    },
  },
  methods: {
    openFilterDialog() {
      this.filterDialog = true;
      this.$nextTick(() => {
        this.$vuetify.goTo('#cards', { duration: 300 });
      });
    },
    filterCards() {
      let filtered = [...this.originalCards];

      if (this.search) {
        filtered = filtered.filter((card) =>
          card.name.toLowerCase().includes(this.search.toLowerCase().trim())
        );
      }

      if (this.selectedType) {
        filtered = filtered.filter((card) => {
          const cardType = card.type ? card.type.toLowerCase() : '';
          return card.type && cardType.includes(this.selectedType.toLowerCase());
        });
      }

      if (this.selectedArchetype) {
        filtered = filtered.filter((card) =>
          card.archetype === this.selectedArchetype
        );
      }

      if (this.selectedAttributes.length > 0) {
        filtered = filtered.filter((card) =>
          card.attribute && this.selectedAttributes.includes(card.attribute)
        );
      }

      if (this.selectedMonsterTypes.length > 0) {
        filtered = filtered.filter((card) =>
          this.selectedMonsterTypes.some(type => 
            card.type && card.type.toLowerCase().includes(type.toLowerCase())
          )
        );
      }

      this.cardsSearched = filtered;
      this.total = filtered.length;
      this.page = 1;
      this.currentIdx = 1;
      this.listPagination();
    },
    listPagination() {
      this.cards = this.cardsSearched.slice(
        (this.currentIdx - 1) * this.perPage,
        this.perPage * this.currentIdx
      );
    },
    changeIndex(idx) {
      this.currentIdx = idx;
      this.listPagination();
      this.$vuetify.goTo('#cards', { duration: 300 });
    },
    updatePerPage() {
      this.perPage = this.cardsPerPage;
      this.page = 1;
      this.currentIdx = 1;
      this.listPagination();
    },
    applyFilters() {
      this.filterCards();
      this.filterDialog = false;
    },
    clearFilters() {
      this.selectedType = null;
      this.selectedArchetype = null;
      this.selectedAttributes = [];
      this.selectedMonsterTypes = [];
      this.filterCards();
      this.filterDialog = false;
    },
    extractArchetypes() {
      const archetypes = new Set();
      this.originalCards.forEach(card => {
        if (card.archetype) {
          archetypes.add(card.archetype);
        }
      });
      this.archetypes = Array.from(archetypes).sort();
    },
  },
  mounted() {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt")
      .then((res) => res.json())
      .then((res) => {
        this.originalCards = res.data;
        this.cardsSearched = res.data;
        this.total = res.data.length;
        this.extractArchetypes();
        this.listPagination();
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
        this.loading = false;
      });
  },
};
</script>

<style scoped>

.filter-actions {
  flex-wrap: wrap;
}
@media (max-width: 600px) {
  .filter-actions .v-btn {
    min-width: 0 !important;
    padding: 0 8px;
  }
}
.grid-section {
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 40px;
}

.section-header h2 {
  color: #1A237E;
}

.filter-row .v-select {
  border-radius: 8px;
}

.gap-3 {
  gap: 12px;
}

.custom-pagination >>> .v-pagination__item {
  font-weight: 500;
}

.custom-pagination >>> .v-pagination__item--is-active {
  font-weight: bold;
}
</style>
