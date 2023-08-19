<template>
    <div
        class="cardsize m-4 bg-luckyv overflow-hidden text-black shadow-xl rounded-b-lg hover:text-white hover:bg-black hover:cursor-pointer"
        @click="open_url"
    >
        <TwitchImage
            :thumbnail-url="stream.thumbnail_url"
            :user-name="stream.user_name"
            :cache-key="cacheKey"
        />
        <div class="px-4 text-sm mb-4">
            <p class="text-xl pt-2">{{ stream.title }}</p>
            <table class="w-80 text-base">
                <tr
                    class="w-100"
                    :title="
                        t('tooltips.viewer', {
                            user: stream.user_name,
                            viewer: stream.viewer_count,
                        })
                    "
                >
                    <td>{{ t("viewer_count") }}</td>
                    <td>{{ stream.viewer_count }}</td>
                </tr>
                <tr
                    :title="
                        t('tooltips.live_since', {
                            user: stream.user_name,
                            time: new Date(
                                stream.started_at
                            ).toLocaleDateString(),
                            total_time: calculate_time,
                        })
                    "
                >
                    <td>{{ t("live_since") }}</td>
                    <td>{{ calculate_time }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import TwitchImage from "./TwitchImage.vue"

const props = defineProps({
    stream: {
        type: Object,
        default: function () {
            return {
                user_id: "",
                user_name: "",
                title: "",
                viewer_count: 0,
                started_at: "2022-01-01T00:00:01Z",
                thumbnail_url: "",
            }
        },
    },
    cacheKey: {
        type: String,
        default: "000000",
    },
})

const { t } = useI18n({
    useScope: "local",
    inheritLocale: true,
})

function open_url() {
    window.open(`https://twitch.tv/${props.stream.user_name}`, "_blank")
}

const calculate_time = computed(() => {
    // Stream runtime calculation
    let startDate = new Date(props.stream.started_at).getTime()
    let timeEnd = Date.now()
    let diff = timeEnd - startDate
    let utcdate = new Intl.DateTimeFormat("de", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }).format(diff)
    return utcdate
})
</script>

<i18n lang="json">
{
    "de": {
        "viewer_count": "Zuschauer:",
        "live_since": "Live seit:",
        "tooltips": {
            "viewer": "{user} hat gerade {viewer} Zuschauer:innen.",
            "live_since": "{user} ist live seit {time} Uhr und damit {total_time} Stunden."
        }
    },
    "en": {
        "viewer_count": "Viewers:",
        "live_since": "Live since:",
        "tooltips": {
            "viewer": "{user} has {viewer} viewers.",
            "live_since": "{user} is live since {time}, which is {total_time} hours."
        }
    }
}
</i18n>
