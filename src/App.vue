<template>
    <PageHeader
        :viewer-count="viewer_count"
        :streamer-count="streamers.length"
    />
    <StreamerList :streamers="streamers" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageHeader from "./components/PageHeader.vue"
import StreamerList from "./components/StreamerList.vue"
import api from "./mixins/api.js";

const viewer_count = ref(0);
const streamers = ref([]);

function filterObject(obj: any) {
    return {
        user_id: obj.user_id,
        user_name: obj.user_name,
        title: obj.title.replace(/^(\[LuckyV\]|\[LuckyV\]|\[LuckyV.de\]|LuckyV\.de|Lucky V|LuckyV\.de|LuckyV)( |)(💛| 💛| 💛 |)/, ""),
        viewer_count: obj.viewer_count,
        started_at: obj.started_at,
        thumbnail_url: obj.thumbnail_url
    };
}
async function get_streamers() {
    let api_response = await api.fetch_or_cache("https://tts-de-gta5.nickwasused.com/?search=luckyv", "streamers");
    if (JSON.stringify(api_response) == JSON.stringify({})) {
        api_response = [];
    }
    streamers.value = api_response.map(filterObject);
    viewer_count.value = api_response.length;
}

onMounted(async () => {
    await get_streamers();
});
</script>

<style lang="css">
@import "./assets/css/app.css";
</style>
