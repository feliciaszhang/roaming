export type Message = {
    message: string
    from: string
}

export type Subscription = {
    room: string
    user: User
}

export type User = {
    nickname: string
    name: string
    picture: string
}