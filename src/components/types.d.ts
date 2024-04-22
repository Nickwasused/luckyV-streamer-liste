interface Streamer {
    user_id: number
    user_name: string
    title: string
    viewer_count: number
    started_at: string
    thumbnail_url: string
}

interface RawStreamer {
    id: string
    user_id: string
    user_login: string
    user_name: string
    game_id: string
    game_name: string
    type: string
    title: string
    viewer_count: number
    started_at: string
    language: string
    thumbnail_url: string
    tags: Array<string>
    is_mature: boolean
}

interface Server {
    available: boolean
    bannerUrl: null | string
    branch: string
    banned: boolean
    build: number
    cdnUrl: string
    description: string
    earlyAuthUrl: string
    gameMode: string
    ip: string
    vanityUrl: string
    publicId: string
    language: string
    lastTimeUpdate: string
    passworded: boolean
    hasCustomSkin: boolean
    address: string
    maxPlayersCount: number
    name: string
    playersCount: number
    port: number
    promoted: boolean
    tags: Array<string>
    useCdn: boolean
    useEarlyAuth: boolean
    useVoiceChat: boolean
    verified: boolean
    version: string
    website: string
}
