<template>
    <PageHeader
        :viewer-count="app_viewerCount"
        :streamer-count="app_streamerCount"
    />
    <StreamerList
        @set_viewer_count="set_viewer_count"
        @set_streamer_count="set_streamer_count"
    />
</template>

<script setup lang="ts">
import { ref } from "vue"
import PageHeader from "./components/PageHeader.vue"
import StreamerList from "./components/StreamerList.vue"

const app_viewerCount = ref(0)
const app_streamerCount = ref(0)

function set_viewer_count(viewerCount: number) {
    app_viewerCount.value = viewerCount
}

function set_streamer_count(streamerCount: number) {
    app_streamerCount.value = streamerCount
}
</script>

<style lang="css">
@import "./assets/css/app.css";
</style>
