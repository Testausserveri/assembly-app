import { ProfileData, fetchProfile } from '@/api/userService';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type Login = { token: string; profile: ProfileData };

export type GlobalState = { login?: Login };

const GlobalStateContext = createContext<{
    state: GlobalState;
    authLoaded: boolean;
    isAuthenticated: () => boolean;
    signin: (login: Login) => void;
    signout: () => void;
}>({} as any);

export function useGlobalState() {
    return useContext(GlobalStateContext);
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

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<GlobalState>({});
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const token = SecureStore.getItem('token');
            if (!token) {
                setAuthLoaded(true);
                return;
            }

            const profile = await fetchProfile(token);

            setState((s) => ({ ...s, login: { profile, token } }));
            setAuthLoaded(true);
        })().catch((e) => {
            console.log(e);
            setAuthLoaded(true);
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (state.login?.token) {
                await SecureStore.setItemAsync('token', state.login.token);
            } else {
                await SecureStore.deleteItemAsync('token');
            }
        })().catch(console.error);
    }, [state.login]);

    const context = {
        state,
        authLoaded,
        signin(login: Login) {
            setState((s) => ({ ...s, login }));
        },
        signout() {
            setState((s) => ({ ...s, login: undefined }));
        },
        isAuthenticated() {
            if (!state.login?.token) return false;
            if (isTokenExpired(state.login.token)) return false;
            return true;
        },
    };

    return <GlobalStateContext.Provider value={context}>{children}</GlobalStateContext.Provider>;
}
