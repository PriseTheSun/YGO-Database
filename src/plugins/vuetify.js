import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        primary: '#1A237E',
        secondary: '#FF6F00',
        accent: '#FFD600',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        'on-background': '#212121',
        'on-surface': '#212121',
      },
      dark: {
        primary: '#1A237E',
        secondary: '#FF6F00',
        accent: '#FFD600',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#121212',
        surface: '#1E1E1E',
        'on-background': '#FFFFFF',
        'on-surface': '#FFFFFF',
      },
    },
    options: {
      customProperties: true,
    },
  },
});
