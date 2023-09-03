<template>
    <div
        v-if="show_filters"
        class="flex flex-col justify-center mx-auto w-auto md:flex-row"
    >
        <button
            :class="
                searchfilter == 'viewer_high' || searchfilter == 'viewer_low'
                    ? 'active_button'
                    : ''
            "
            @click="set_filter('viewer')"
        >
            {{
                searchfilter == "viewer_high"
                    ? t("sort.viewer_low")
                    : t("sort.viewer_high")
            }}
        </button>
        <button
            :class="
                searchfilter == 'alphabetically_az' ||
                searchfilter == 'alphabetically_za'
                    ? 'active_button'
                    : ''
            "
            @click="set_filter('alphabetically')"
        >
            {{
                searchfilter == "alphabetically_az"
                    ? t("sort.alphabetically_za")
                    : t("sort.alphabetically_az")
            }}
        </button>
        <button
            :class="
                searchfilter == 'runtime_high' || searchfilter == 'runtime_low'
                    ? 'active_button'
                    : ''
            "
            @click="set_filter('runtime')"
        >
            {{
                searchfilter == "runtime_high"
                    ? t("sort.runtime_low")
                    : t("sort.runtime_high")
            }}
        </button>
        <button
            :class="searchfilter.includes('shuffle') ? 'active' : ''"
            @click="set_filter('shuffle')"
        >
            {{ t("sort.shuffle") }}
        </button>
    </div>
    <div v-if="small_device" @click="show_filters = !show_filters">
        <img
            :alt="
                show_filters ? 'hide filters button' : 'expand filters button'
            "
            :class="
                show_filters
                    ? 'block m-auto rotate-0 hover:invert'
                    : 'block m-auto rotate-180 hover:invert'
            "
            width="71"
            height="71"
            :src="up_icon"
        />
    </div>
    <div
        v-if="streamers.length > 0"
        class="flex w-[80%] m-auto p-1 text-4xl border-[1px] rounded bg-[#333] border-[#1a1a1a]"
        :title="t('searchinfo')"
    >
        <input
            class="w-[95%] p-3 bg-[#333] font-[Courgette] focus:outline-none text-[#dadada]"
            v-model="searchword"
            type="text"
            :placeholder="t('search')"
        />
        <div class="transition h-16 w-16 inline invert-0 hover:invert">
            <img
                class="w-full h-full"
                alt="clear search"
                :src="x_icon"
                @click="searchword = ''"
            />
        </div>
    </div>
    <div
        v-if="streamers.length > 0"
        class="flex flex-row flex-wrap list-none m-auto max-w-[95%] sm:max-w-[80%]"
    >
        <StreamerItem
            v-for="stream of filterstreamers"
            :key="stream.user_id"
            :stream="stream"
            :cache-key="imgCacheKey"
        />
    </div>
    <a
        v-if="filterstreamers.length > 3"
        href="#top"
        class="top"
        :aria-label="t('up')"
        :title="t('up')"
    >
        <div
            class="w-[3%] h-auto bg-[#fcd401] rounded-full fixed bottom-2 right-2 invisible md:visible"
        >
            <img
                class="w-full block m-auto invert-0 transition-all hover:invert"
                alt=""
                width="66"
                height="66"
                :src="up_icon"
            />
        </div>
    </a>
</template>

<style lang="css" scoped>
button {
    @apply transition-all flex-col appearance-none bg-luckyv text-black cursor-pointer text-center m-[1%] px-4 border-8 rounded border-luckyv hover:bg-black hover:text-white hover:border-black;
}

.active_button {
    @apply border-black bg-black text-white;
}
</style>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, computed } from "vue"
import { useI18n } from "vue-i18n"
import StreamerItem from "./StreamerItem.vue"
import useDebouncedRef from "./useDebouncedRef.js"
import x_icon from "@/assets/img/x.svg"
import up_icon from "@/assets/img/up.svg"
import api from "../mixins/api"

const { t } = useI18n({
    useScope: "local",
    inheritLocale: true,
})

const streamers = ref([]);
const emit = defineEmits(["set_viewer_count", "set_streamer_count"]);

const imgCacheKey = ref<string>(Math.random().toString().substring(2, 8))
const searchword = useDebouncedRef("", 300, false)
const show_filters = ref<boolean>(true)
const small_device = ref<boolean>(false)
const resize_timeout = ref<number | null>(null)
// possible values: alphabetically_az, alphabetically_za, viewer_high, viewer_low, shuffle, runtime_high, runtime_low
// default value: viewer_high
const searchfilter = ref<string>("viewer_high")

// load filter from localstorage
try {
    const load_filter = localStorage.getItem("sort_method")
    if (load_filter != undefined) {
        searchfilter.value = load_filter
    }
} catch (error) {
    console.warn("localstorage error.")
}

function set_filter(new_filter: string) {
    switch (new_filter) {
        case "shuffle":
            if (streamers.value.length != 0) {
                searchfilter.value = `shuffle-${Math.random()
                    .toString()
                    .substring(2, 3)}`
            }
            break
        case "viewer":
            if (searchfilter.value == "viewer_high") {
                searchfilter.value = "viewer_low"
            } else {
                searchfilter.value = "viewer_high"
            }
            break
        case "alphabetically":
            if (searchfilter.value == "alphabetically_az") {
                searchfilter.value = "alphabetically_za"
            } else {
                searchfilter.value = "alphabetically_az"
            }
            break
        case "runtime":
            if (searchfilter.value == "runtime_high") {
                searchfilter.value = "runtime_low"
            } else {
                searchfilter.value = "runtime_high"
            }
            break
        default:
            searchfilter.value == "viewer_high"
            break
    }
}

function window_resize(skip_delay: boolean = false) {
    if (skip_delay) {
        const width = window.innerWidth
        small_device.value = width < 742
        show_filters.value = !small_device.value
    } else {
        if (!resize_timeout.value) {
            resize_timeout.value = setTimeout(function () {
                const width = window.innerWidth
                small_device.value = width < 742
                show_filters.value = !small_device.value
                if (resize_timeout.value) {
                    clearTimeout(resize_timeout.value)
                    resize_timeout.value = null
                }
            }, 500)
        }
    }
}

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
    // create a array with only the viewer_count
    const viewerCount = api_response.map(obj => obj.viewer_count);

    // count all viewers together
    const totalViewerCount = viewerCount.reduce((acc, count) => acc + count, 0);
    emit("set_viewer_count", totalViewerCount);
    emit("set_streamer_count", streamers.value.length);
}

onMounted(async () => {
    window_resize(true)
    window.addEventListener("resize", function () {
        window_resize(false)
    })

    // save selected filter on page exit
    window.addEventListener("beforeunload", () => {
        if (searchfilter.value.includes("shuffle")) {
            localStorage.setItem("sort_method", "shuffle")
        } else {
            localStorage.setItem("sort_method", searchfilter.value)
        }
    })

    await get_streamers();
})

onUnmounted(() => {
    window.removeEventListener("resize", function () {
        window_resize(false)
    })
    if (resize_timeout.value) {
        clearTimeout(resize_timeout.value)
    }
})

// Fisher-Yates shuffle algorithm
function shuffleArray(array: Array<Streamer>) {
    let remainingElements = array.length
    // Iterate through the array from the last element to the first
    while (remainingElements) {
        // Pick a random element from the remaining portion of the array
        let randId = Math.floor(Math.random() * remainingElements--)
        // Swap the current element with the random element
        let tmp = array[remainingElements]
        array[remainingElements] = array[randId]
        array[randId] = tmp
    }
    return array
}

const filterstreamers = computed<Array<Streamer>>(() => {
    const tmp_searchword = searchword.value.toLowerCase()
    let local_filter = searchfilter.value

    const tmp_streamers = streamers.value.filter(
        (streamer: Streamer) =>
            streamer.title.toLowerCase().includes(tmp_searchword) ||
            streamer.user_name.toLowerCase().includes(tmp_searchword)
    )

    if (local_filter.toLowerCase().includes("shuffle")) {
        local_filter = "shuffle"
    }

    switch (local_filter) {
        case "viewer_high":
            return [...tmp_streamers]
                .sort(function (a, b) {
                    return a["viewer_count"] - b["viewer_count"]
                })
                .reverse()
        case "viewer_low":
            return [...tmp_streamers].sort(function (a, b) {
                return a["viewer_count"] - b["viewer_count"]
            })
        case "alphabetically_az":
            return [...tmp_streamers].sort(function (a, b) {
                const a1 = a["user_name"].toLowerCase()
                const b1 = b["user_name"].toLowerCase()
                return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
            })
        case "alphabetically_za":
            return [...tmp_streamers]
                .sort(function (a, b) {
                    const a1 = a["user_name"].toLowerCase()
                    const b1 = b["user_name"].toLowerCase()
                    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
                })
                .reverse()
        case "shuffle":
            return shuffleArray(tmp_streamers)
        case "runtime_high":
            return [...tmp_streamers]
                .sort(function (a, b) {
                    const a1 = a["started_at"]
                    const b1 = b["started_at"]
                    return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
                })
                .reverse()
        case "runtime_low":
            return [...tmp_streamers].sort(function (a, b) {
                const a1 = a["started_at"]
                const b1 = b["started_at"]
                return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
            })
        default:
            return tmp_streamers
    }
})
</script>

<i18n lang="json">
{
    "de": {
        "search": "Suche...",
        "searchinfo": "Streamer:in, Stream Titel.",
        "sort": {
            "viewer_high": "Zuschauer ⬆️",
            "viewer_low": "Zuschauer ⬇️",
            "alphabetically_az": "alphabetisch 🅰️- 🇿",
            "alphabetically_za": "alphabetisch 🇿 -🅰️",
            "shuffle": "Zufällig 🎲",
            "runtime_high": "Laufzeit ⌛",
            "runtime_low": "Laufzeit ⏳"
        },
        "up": "Zurück nach oben."
    },
    "en": {
        "search": "Search...",
        "searchinfo": "Streamer, Stream Title.",
        "sort": {
            "viewer_high": "Viewer ⬆️",
            "viewer_low": "Viewer ⬇️",
            "alphabetically_az": "alphabetically 🅰️- 🇿",
            "alphabetically_za": "alphabetically 🇿 -🅰️",
            "shuffle": "Random 🎲",
            "runtime_high": "Runtime ⌛",
            "runtime_low": "Runtime ⏳"
        },
        "up": "Back to top."
    }
}
</i18n>
