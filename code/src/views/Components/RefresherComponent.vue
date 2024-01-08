<template>
    <ion-refresher @ionRefresh="handleRefresh(event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    methods: {
      handleRefresh(event) {
        setTimeout(() => {
          // Fügen Sie hier Ihre Datenladevorgänge hinzu
          event.target.complete();
        }, 1500);
      },
    },
  };
  </script>