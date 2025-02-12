import { ProfileData, fetchProfile } from '@/api/userService';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type Login = { token: string; profile: ProfileData };

export type GlobalState = { login?: Login };

const GlobalStateContext = createContext<{
    state: GlobalState;
    authLoaded: boolean;
    signin: (login: Login) => void;
    signout: () => void;
}>({} as any);

export function useGlobalState() {
    return useContext(GlobalStateContext);
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
    };

    return <GlobalStateContext.Provider value={context}>{children}</GlobalStateContext.Provider>;
}
