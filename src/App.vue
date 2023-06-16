<template>
  <PageHeader
    v-if="!loading"
    :viewer_count="result.getViewerCount"
    :streamer_count="result.Streamers.length"
  />
  <StreamerList
    v-if="!loading"
    :streamers="result.Streamers"
  />
  <div v-if="error">
    {{ error }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PageHeader from "./components/PageHeader.vue";
import StreamerList from "./components/StreamerList.vue";
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

const timer = ref(null);
const { result, loading, error, refetch } = useQuery(gql`
  query {
    getViewerCount(title: "luckyv,lucky v")
    Streamers(title: "luckyv,lucky v") {
      user_id
      user_name
      title
      viewer_count
      started_at
      thumbnail_url
    }
  }
`);

onMounted(() => {
    if (timer.value == null) {
        timer.value = setInterval(() => {
            refetch();
            imgcachekey.value = Math.random().toString().substring(2, 8);
        }, 300000);
    }
});

onUnmounted(() => {
    clearInterval(timer.value);
    window.removeEventListener("resize", window_resize);
});
</script>

<style lang="scss">
@import "./assets/app.scss";
</style>
