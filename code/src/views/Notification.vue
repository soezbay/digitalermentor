<!-- Notification.vue -->
<template>
    <div>
      <ion-card v-for="notification in notifications" :key="notification.id">
        <ion-card-header>{{ notification.title }}</ion-card-header>
        <ion-card-content>{{ notification.message }}</ion-card-content>
      </ion-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [],
      };
    },
    created() {
      // Fetch notifications from the backend when the component is created
      this.fetchNotifications();
    },
    methods: {
      fetchNotifications() {
        // Make an API request to fetch notifications for the current user
        // Use appropriate API endpoint and authentication headers
        // Update the notifications data property
  
        const userId = 'User-S2'; // Replace with the actual user ID
        fetch(`http://localhost:3000/api/notifications/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            this.notifications = data;
          })
          .catch((error) => console.error('Error fetching notifications:', error));
      },
    },
  };
  </script>
  