export interface AuthInfo extends Record<string, any>{
    identity: string
    password: string
}

export interface SingUpInfo extends Record<string, any>{
    username: string
    email: string
    password: string
    passwordConfirm: string
}

export interface Session{
    token: string
    user: UserInfo
}

export interface UserInfo extends Record<string, any>{
    avatar: string
    collectionName: string
    email: string
    id: string
    name: string
    username: string
}