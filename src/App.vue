<template>
  <v-app>
    <HeadBar :search=tmp @open-filters="openFilters" @open-about="aboutDialog = true" />
    <ParalaxHero />
    <GridSystem :search=mySearch ref="gridSystem" />
    <SetFoot @open-filters="openFilters" @open-about="aboutDialog = true"/>

    <v-dialog v-model="aboutDialog" max-width="700">
      <v-card>
        <v-card-title class="primary white--text d-flex align-center">
          <v-icon left color="white">mdi-information</v-icon>
          Sobre o Projeto
          <v-spacer></v-spacer>
          <v-btn icon dark @click="aboutDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" class="text-center mb-4">
              <v-avatar size="100" color="primary">
                <v-icon size="60" color="white">mdi-cards-outline</v-icon>
              </v-avatar>
              <h2 class="text-h4 mt-3 primary--text font-weight-bold">YGO Database</h2>
              <p class="text-subtitle-1 grey--text">Database Yu-Gi-Oh! Brasil & Portugal</p>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12">
              <h4 class="text-h6 mb-3 secondary--text">
                <v-icon small class="mr-1">mdi-heart</v-icon>
                Uma História de Paixão
              </h4>
              <p class="text-body-1">
                Este projeto nasceu do meu amor por Yu-Gi-Oh! desde criança. Lembro-me de passar horas assistindo ao anime, jogando com amigos e sonhando com cartas lendárias. 
                <br><br>
                Este database é uma forma de manter viva a magia deste jogo incrível, tornando-o acessível para jogadores brasileiros e portugueses, com informações em nossa língua natal.
              </p>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12">
              <h4 class="text-h6 mb-3 primary--text">
                <v-icon small class="mr-1">mdi-cog</v-icon>
                Tecnologias Utilizadas
              </h4>
              <div class="d-flex flex-wrap gap-2 justify-center">
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-vuejs</v-icon>
                  Vue.js
                </v-chip>
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-vuetify</v-icon>
                  Vuetify
                </v-chip>
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-language-javascript</v-icon>
                  JavaScript
                </v-chip>
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-api</v-icon>
                  YGOPRODeck API
                </v-chip>
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-html5</v-icon>
                  HTML5
                </v-chip>
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-css3</v-icon>
                  CSS3
                </v-chip>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12" class="text-center">
              <h4 class="text-h6 mb-3">
                <v-icon small class="mr-1">mdi-account</v-icon>
                Desenvolvido por
              </h4>
              <p class="text-body-1 font-weight-bold">Erik Araujo</p>
              <div class="d-flex justify-center gap-2 mt-2">
                <v-btn
                  color="primary"
                  dark
                  href="https://github.com/PriseTheSun/YGO-Database"
                  target="_blank"
                >
                  <v-icon left>mdi-github</v-icon>
                  GitHub
                </v-btn>
                <v-btn
                  color="info"
                  dark
                  href="https://www.linkedin.com/in/deverikaraujo"
                  target="_blank"
                >
                  <v-icon left>mdi-linkedin</v-icon>
                  LinkedIn
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="aboutDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import HeadBar from "@/components/molecules/HeadBar";
import ParalaxHero from "@/components/molecules/ParalaxHero";
import GridSystem from "@/components/molecules/GridSystem";
import SetFoot from  '@/components/molecules/SetFoot.vue'

export default {
  name: "App",

  components: {
    HeadBar,
    ParalaxHero,
    GridSystem,
    SetFoot
  },
  data(){
    return {
      mySearch: null,
      aboutDialog: false,
    };
  },
  methods: {
    tmp: function(val){
      console.log(val);
      this.mySearch= val;
    },
    openFilters() {
      this.$refs.gridSystem.openFilterDialog();
    },
  },
};
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
