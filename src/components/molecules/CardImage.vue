<template>
  <div class="ygo-card" @click="openDetailDialog">
    <div class="image-container">
      <v-img
        :src="card.card_images[0].image_url"
        height="350"
        contain
        class="card-image"
      ></v-img>
    </div>
    
    <div class="card-info">
      <div class="card-name">{{ card.name }}</div>
      <div class="card-type">{{ formatType(card.type) }}</div>
      <div class="card-stats" v-if="card.atk !== undefined">
        <span class="atk">ATK {{ card.atk }}</span>
        <span v-if="card.def !== undefined" class="def">DEF {{ card.def }}</span>
      </div>
    </div>

    <v-dialog v-model="detailDialog" max-width="800" scrollable>
      <v-card v-if="selectedCard">
        <v-card-title class="primary white--text d-flex align-center">
          <span>{{ selectedCard.name }}</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="detailDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="pa-0">
          <v-row no-gutters>
            <v-col cols="12" md="5" class="pa-4 d-flex align-center justify-center bg-grey-lighten-4">
              <v-img
                :src="selectedCard.card_images[0].image_url"
                max-width="280"
                contain
              ></v-img>
            </v-col>
            <v-col cols="12" md="7" class="pa-4">
              <v-chip small class="mb-3" color="primary" dark>
                {{ selectedCard.type }}
              </v-chip>
              
              <div v-if="selectedCard.archetype" class="mb-3">
                <span class="text-caption grey--text">Arquétipo:</span>
                <v-chip x-small outlined class="ml-1">{{ selectedCard.archetype }}</v-chip>
              </div>
              
              <div v-if="selectedCard.atk !== undefined" class="d-flex gap-4 mb-3">
                <div class="stat-box">
                  <v-icon small color="red-darken-2">mdi-sword</v-icon>
                  <span class="ml-1 font-weight-bold">{{ selectedCard.atk }}</span>
                </div>
                <div class="stat-box">
                  <v-icon small color="blue-darken-2">mdi-shield</v-icon>
                  <span class="ml-1 font-weight-bold">{{ selectedCard.def }}</span>
                </div>
                <div v-if="selectedCard.level" class="stat-box">
                  <v-icon small color="amber">mdi-star</v-icon>
                  <span class="ml-1 font-weight-bold">Nível {{ selectedCard.level }}</span>
                </div>
              </div>

              <v-divider class="my-3"></v-divider>

              <div class="description-section">
                <h5 class="text-subtitle-2 font-weight-bold mb-2 primary--text">
                  <v-icon small class="mr-1">mdi-flag</v-icon>
                  Português (PT)
                </h5>
                <p class="text-body-2 card-desc">{{ selectedCard.desc }}</p>
              </div>

              <v-divider class="my-3"></v-divider>

              <div class="description-section">
                <h5 class="text-subtitle-2 font-weight-bold mb-2 secondary--text">
                  <v-icon small class="mr-1">mdi-translate</v-icon>
                  English (EN)
                </h5>
                <div v-if="englishDesc" class="text-body-2 card-desc">
                  {{ englishDesc }}
                </div>
                <v-progress-circular
                  v-else-if="loadingEnglish"
                  indeterminate
                  color="secondary"
                  size="20"
                ></v-progress-circular>
                <p v-else class="grey--text text-caption">Clique para carregar tradução</p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="secondary" variant="text" @click="loadEnglishTranslation">
            <v-icon left>mdi-translate</v-icon>
            Traduzir
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="viewCard">
            <v-icon left>mdi-open-in-new</v-icon>
            Ver Imagem Grande
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    detailDialog: false,
    selectedCard: null,
    englishDesc: null,
    loadingEnglish: false,
  }),
  props: {
    card: Object
  },
  watch: {
    detailDialog(val) {
      if (val) {
        this.selectedCard = this.card;
        this.englishDesc = null;
        this.loadingEnglish = false;
      }
    }
  },
  methods: {
    formatType(type) {
      if (!type) return '';
      if (type.length > 25) {
        return type.substring(0, 25) + '...';
      }
      return type;
    },
    openDetailDialog() {
      this.detailDialog = true;
    },
    viewCard() {
      window.open(this.card.card_images[0].image_url, '_blank');
    },
    async loadEnglishTranslation() {
      if (this.englishDesc) return;
      
      this.loadingEnglish = true;
      try {
        const cardName = encodeURIComponent(this.card.name);
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?cardname=${cardName}&language=en`);
        const data = await response.json();
        
        if (data.data && data.data[0] && data.data[0].desc) {
          this.englishDesc = data.data[0].desc;
        } else {
          this.englishDesc = 'Tradução não disponível';
        }
      } catch (error) {
        console.error('Error fetching English translation:', error);
        this.englishDesc = 'Erro ao carregar tradução';
      } finally {
        this.loadingEnglish = false;
      }
    },
  }
}
</script>

<style scoped>
.ygo-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ygo-card:hover {
  transform: translateY(-4px);
}

.image-container {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
}

.card-info {
  padding: 12px 8px;
  text-align: center;
}

.card-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #212121;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-type {
  font-size: 0.75rem;
  color: #757575;
  margin-top: 2px;
}

.card-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}

.card-stats .atk, .card-stats .def {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.card-stats .atk {
  background: #c62828;
}

.card-stats .def {
  background: #1565c0;
}

.stat-box {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.card-desc {
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
}
</style>
