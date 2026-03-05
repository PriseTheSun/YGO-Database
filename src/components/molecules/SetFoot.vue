<template>
  <v-footer class="footer-section" padless id="about">
    <v-container>
      <v-row class="py-8">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="footer-brand mb-4">
            <v-icon large color="secondary" class="mr-2">mdi-cards-outline</v-icon>
            <span class="text-h5 font-weight-bold">
              <span class="secondary--text">YGO</span>Database
            </span>
          </div>
          <p class="grey--text text--darken-1">
            O maior banco de dados de cartas Yu-Gi-Oh!<br>
            em português do Brasil e Portugal
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <h4 class="text-h6 mb-4 font-weight-bold">Links Rápidos</h4>
          <div class="footer-links">
            <v-btn text small href="#cards">
              <v-icon left small>mdi-cards</v-icon>
              Cards
            </v-btn>
            <v-btn text small href="#about">
              <v-icon left small>mdi-information</v-icon>
              Sobre
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="text-center text-md-right">
          <h4 class="text-h6 mb-4 font-weight-bold">Conecte-se</h4>
          <div class="social-icons">
            <v-btn
              v-for="icon in socialIcons"
              :key="icon.name"
              :href="icon.url"
              target="_blank"
              icon
              class="mx-2"
            >
              <v-icon>{{ icon.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" style="opacity: 0.3;"></v-divider>

      <v-row>
        <v-col cols="12" class="text-center py-3">
          <p class="mb-0 grey--text text--darken-2">
            © {{ new Date().getFullYear() }} <strong>YGO Database</strong> — 
            Feito com 
            <v-icon small color="error" class="mx-1">mdi-heart</v-icon> 
            por Erik Araujo
          </p>
          <p class="grey--text text--disabled text-caption mt-1">
            Dados fornecidos por <a href="https://ygoprodeck.com" target="_blank" class="secondary--text">YGOPRODECK</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      socialIcons: [
        { name: 'GitHub', icon: 'mdi-github', url: '#' },
        { name: 'Discord', icon: 'mdi-discord', url: '#' },
        { name: 'Twitter', icon: 'mdi-twitter', url: '#' },
      ],
    };
  },
};
</script>

<style scoped>
.footer-section {
  background: #f5f5f5;
  border-top: 2px solid rgba(255, 111, 0, 0.3);
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.footer-links .v-btn {
  display: block;
  margin: 4px auto;
}

@media (min-width: 960px) {
  .footer-links .v-btn {
    display: inline-block;
    margin: 0 8px;
  }
}

.social-icons .v-btn {
  transition: all 0.3s ease;
}

.social-icons .v-btn:hover {
  transform: scale(1.2);
  color: #FF6F00 !important;
}

a {
  text-decoration: none;
}
</style>
