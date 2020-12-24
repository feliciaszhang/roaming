export type Message = {
    message: string
    from: string
}

export type Subscription = {
    room: string
    user: {email: string, name: string}
}