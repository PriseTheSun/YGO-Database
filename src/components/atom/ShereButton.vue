<template>
  <v-btn 
    icon 
    x-small 
    color="grey"
    @click="shareCard"
  >
    <v-icon x-small>mdi-share-variant</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      dialShare: false,
    };
  },
  methods: {
    shareCard() {
      const cardUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: 'YGO Database',
          text: 'Check out this card!',
          url: cardUrl,
        });
      } else {
        navigator.clipboard.writeText(cardUrl);
      }
    },
  },
}
</script>
