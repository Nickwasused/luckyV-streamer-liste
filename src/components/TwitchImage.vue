<template>
    <div class="bg-center bg-no-repeat bg-cover contrast-75 overflow-hidden relative transition-all">
        <img
            class="w-full h-full"
            v-lazyload
            width="640px"
            height="340px"
            :src="placeholder"
            srcset=""
            :data-srcset="
                `${thumbnailUrl
                    .replace('{width}', '320')
                    .replace('{height}', '180')}?cache-key=${cacheKey} 320w, ` +
                `${thumbnailUrl
                    .replace('{width}', '480')
                    .replace('{height}', '270')}?cache-key=${cacheKey} 480w, ` +
                `${thumbnailUrl
                    .replace('{width}', '640')
                    .replace('{height}', '360')}?cache-key=${cacheKey} 640w`
            "
            :alt="userName"
            referrerPolicy="same-origin"
            crossorigin="anonymous"
            sizes="(min-width: 1400px) 100vw, (min-width: 1200px) 30vw, (min-width: 895px) 20vw, (min-width: 740px) 50vw, (min-width: 640px) 30vw, 100vw"
        />
        <div v-once class="absolute bottom-5 right-5 bg-black px-2 text-2xl text-white">
            {{ userName }} 
            <img class="w-[1em] h-100 invert inline" alt="twitch logo" :src="twitch_icon" />
        </div>
        <img class="hidden absolute top-1 right-2 w-10 h-20 invert hover:visible" :src="external_icon" />
    </div>
</template>

<script setup lang="ts">
import placeholder from "@/assets/img/placeholder.webp"
import external_icon from "@/assets/img/external.svg"
import twitch_icon from "@/assets/img/twitch.svg"

const props = defineProps({
    thumbnailUrl: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    cacheKey: {
        type: String,
        required: true,
    },
})
</script>
