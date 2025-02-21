import { StatusError } from './errors';

export interface ProfileData {
    id: number;
    email: string;
    phone?: string;
    created_at: string;
    first_name?: string;
    last_name?: string;
    status: number;
    verified_at?: string;
    extra: unknown;
    username?: string;
    user_level: number;
    is_banned: boolean;
    profile_preferences: ProfilePreferences;
    telia_linked_at?: string;
    marketing_box_granted: boolean;
    region: string;
    opened_lootboxes_count: number;
    balance: number;
    social_login: boolean;
}

interface ProfilePreferences {
    coins: boolean;
    realName: boolean;
    memberSince: boolean;
    shoutTrophy: boolean;
    questionTrophy: boolean;
    allowShowUsername: boolean;
    openedLootboxesCount: boolean;
}

const opts = (token?: string, body?: unknown) => {
    const headers: Record<string, string> = {};
    headers['Content-Type'] = 'application/json';

    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    if (body) {
        const bodyString = JSON.stringify(body);
        headers['Content-Length'] = bodyString.length.toString();
        return { method: 'POST', headers, body: bodyString };
    }

    return { method: 'POST', headers };
};

export async function fetchProfile(token: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/jwt`;

    const response = await fetch(url, opts(token));
    const data = await response.json();
    return data as ProfileData;
}

export async function signupRequest(email: string, password: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/person/signup`;

    const response = await fetch(url, opts(undefined, { email, password, region: 'asm' }));
    if (!response.ok) {
        throw new StatusError('signup-failed', response.status);
    }
    const data = await response.json();
    return { profile: data as ProfileData, token: response.headers.get('x-auth-token')! };
}

export async function loginRequest(login: string, password: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/local?region=asm`;
    const response = await fetch(url, opts(undefined, { login, password }));

    if (!response.ok) {
        throw new StatusError('login-failed', response.status);
    }
    const data = await response.json();
    return { profile: data as ProfileData, token: response.headers.get('x-auth-token')! };
}
