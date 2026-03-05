<template>
  <v-parallax
    height="700"
    src="https://images5.alphacoders.com/967/thumb-1920-967270.png"
    class="hero-section"
  >
    <div class="hero-overlay"></div>
    <v-container class="position-relative fill-height">
      <v-row align="center" justify="center" class="fill-height">
        <v-col class="text-center" cols="12">
          <div class="hero-badge mb-4">
            <v-chip color="secondary" dark large>
              <v-icon left>mdi-star</v-icon>
              Database Oficial
            </v-chip>
          </div>
          <h1 class="text-h1 font-weight-bold mb-2 hero-title">
           Yu-Gi-Oh!
          </h1>
          <h4 class="text-h4 font-weight-light mb-6 hero-subtitle secondary--text">
            Portugal | Brasil
          </h4>
          <p class="text-body-1 grey--text text--lighten-2 mb-8 hero-description mx-auto">
            Encontre todas as cartas do seu deck favorito<br>
            e descubra novas estratégias de duelo
          </p>
          <div class="hero-buttons">
            <v-btn
              x-large
              color="secondary"
              dark
              class="mr-4 mb-2"
              href="#cards"
            >
              <v-icon left>mdi-magnify</v-icon>
              Explorar Cards
            </v-btn>
            <v-btn
              x-large
              outlined
              dark
              class="mb-2"
              href="#about"
            >
              <v-icon left>mdi-information</v-icon>
              Sobre o Projeto
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
}
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(21, 57, 136, 0.75) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  z-index: 1;
}

.position-relative {
  position: relative;
  z-index: 2;
}

.hero-title {
  text-shadow: 0 0 30px rgba(255, 111, 0, 0.5);
  animation: fadeInDown 1s ease-out;
  color: white;
}

.hero-subtitle {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-description {
  max-width: 600px;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.hero-buttons {
  animation: fadeInUp 1s ease-out 0.7s both;
}

.hero-badge {
  animation: fadeInDown 1s ease-out 0.2s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  .hero-subtitle {
    font-size: 1.25rem !important;
  }
  .hero-buttons .v-btn {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 8px;
  }
}
</style>
