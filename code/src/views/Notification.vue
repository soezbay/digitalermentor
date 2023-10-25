<template>
    <div>
      <div v-for="(notification, index) in notifications" :key="index">
        <div class="notification">
          <p>{{ notification.message }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [], // Hier werden die Benachrichtigungen gespeichert
      };
    },
    created() {
      // Hier können Sie eine Verbindung zu Ihrem Backend herstellen, um Benachrichtigungen zu empfangen.
      // Verwenden Sie WebSockets, Firebase Cloud Messaging oder eine andere Technologie Ihrer Wahl.
    },
  };
  </script>
  
  <style scoped>
  .notification {
    background-color: #e0e0e0;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
    border-radius: 5px;
  }
  </style>