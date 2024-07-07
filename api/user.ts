import { ProfileData } from '@/components/GlobalStateProvider';

const opts = (token?: string, body?: unknown) => ({
    method: 'POST',
    headers: token
        ? { Authorization: 'Bearer ' + token, 'content-type': 'application/json' }
        : ({ 'content-type': 'application/json' } as any),
    body: body ? JSON.stringify(body) : undefined,
});

export async function fetchProfile(token: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/jwt`;

    const response = await fetch(url, opts(token));
    const data = await response.json();
    console.log(data);
    return data as ProfileData;
}

export async function signupRequest(email: string, password: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/person/signup`;

    const response = await fetch(url, opts(undefined, { email, password, region: 'asm' }));
    const data = await response.json();
    console.log(data);
    return {
        profile: data as ProfileData,
        token: response.headers.get('x-auth-token')!,
    };
}

export async function loginRequest(login: string, password: string) {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/auth/local?region=asm`;

    const response = await fetch(url, opts(undefined, { login, password }));
    const data = await response.json();
    console.log(data);
    return {
        profile: data as ProfileData,
        token: response.headers.get('x-auth-token')!,
    };
}
