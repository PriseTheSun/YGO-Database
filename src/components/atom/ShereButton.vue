<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary" outlined small rounded v-bind="attrs" v-on="on" @click="shareCard" class="share-btn">
          <v-icon small class="mr-1">mdi-share-variant</v-icon>
          <span v-if="!isMobile" class="share-text">Compartilhar</span>
        </v-btn>
      </template>
      <span>Compartilhar carta</span>
    </v-tooltip>

    <v-snackbar v-model="showSnackbar" :timeout="2000" bottom right color="success">
      ✓ Link copiado para a área de transferência!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showSnackbar: false,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    shareCard() {
      let cardUrl = window.location.href;
      if (this.card && this.card.name) {
        const param = `card=${encodeURIComponent(this.card.name)}`;
        cardUrl += cardUrl.includes('?') ? '&' + param : '?' + param;
      }
      const shareData = {
        title: 'YGO Database',
        text: this.card && this.card.name ? `Confira esta carta: ${this.card.name}` : 'Confira esta carta!',
        url: cardUrl,
      };
      if (navigator.share) {
        navigator.share(shareData).catch(err => {
          console.error('Share failed', err);
          this.copyToClipboard(cardUrl);
        });
      } else {
        this.copyToClipboard(cardUrl);
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.showSnackbar = true;
      }).catch(err => {
        console.error('Erro ao copiar:', err);
      });
    },
  },
}
</script>

<style scoped>
.share-btn {
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: none;
}

.share-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 64, 129, 0.3);
}

.share-text {
  font-size: 0.85rem;
  letter-spacing: 0.3px;
}

@media (max-width: 600px) {
  .share-btn {
    min-width: auto;
    padding: 4px 8px;
  }
}
</style>
