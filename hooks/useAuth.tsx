import { ProfileData, fetchProfile } from '@/api/userService';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface AuthState {
    token?: string;
    profile?: ProfileData;
    status: 'loading' | 'logged-in' | 'logged-out';
    signin: (token: string, profile: ProfileData) => void;
    signout: () => void;
}

function isTokenExpired(token: string) {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
        const decoded = JSON.parse(decodedJson);
        const exp = decoded.exp;
        const expired = Date.now() >= exp * 1000;
        return expired;
    } catch (error) {
        console.error(error);
        return true;
    }
}

const AuthStateContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthStateContext);

export function AuthStateProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        status: 'loading',
        signin(token: string, profile: ProfileData) {
            setState((s) => ({ ...s, token, profile, status: 'logged-in' }));
        },
        signout() {
            setState((s) => ({ ...s, profile: undefined, token: undefined, status: 'logged-out' }));
        },
    });

    useEffect(() => {
        (async () => {
            const token = SecureStore.getItem('token');
            if (!token || isTokenExpired(token)) {
                setState((s) => ({ ...s, status: 'logged-out' }));
                return;
            }

            const profile = await fetchProfile(token);

            setState((s) => ({ ...s, token, profile, status: 'logged-in' }));
        })().catch((e) => {
            console.error(e);
            setState((s) => ({ ...s, status: 'logged-out' }));
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (state.token) {
                await SecureStore.setItemAsync('token', state.token);
            } else {
                await SecureStore.deleteItemAsync('token');
            }
        })().catch(console.error);
    }, [state.token]);

    return <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>;
}
