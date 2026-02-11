<template>
  <vo-app-bar logo="vone" />

  <vo-notifications-banner />

  <v-main>
    <v-container class="py-8">
      <v-card>
        <v-card-title>Debug Utilities</v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap ga-2">
            <v-btn
              color="error"
              text="Clear Notifications Read"
              variant="outlined"
              @click="clearReadNotifications"
            />

            <v-btn
              color="error"
              text="Clear Notifications Last"
              variant="outlined"
              @click="clearLastReadNotification"
            />

            <v-btn
              color="error"
              text="Clear Banners Read"
              variant="outlined"
              @click="clearReadBanners"
            />

            <v-btn
              color="error"
              text="Clear Banners Last"
              variant="outlined"
              @click="clearLastReadBanner"
            />

            <v-btn
              color="error"
              text="Clear All New"
              variant="outlined"
              @click="clearAllNew"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>

  <vo-social-footer app />
</template>

<script setup lang="ts">
  const user = useUserStore()

  function clearReadNotifications () {
    user.one.notifications.read = []
  }

  function clearLastReadNotification () {
    user.one.notifications.last = ''
  }

  function clearReadBanners () {
    user.one.banners.read = []
  }

  function clearLastReadBanner () {
    user.one.banners.last = ''
  }

  function clearAllNew () {
    user.ecosystem.mcp.seen = false
    user.one.ecosystem.seen = false
  }
</script>
