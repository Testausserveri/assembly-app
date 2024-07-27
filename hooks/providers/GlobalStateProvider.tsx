import { ProfileData } from '@/api/userService';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type Login = {
    token: string;
    profile: ProfileData;
};

export type GlobalState = {
    login?: Login;
};

const GlobalStateContext = createContext<{
    state: GlobalState;
    signin: (login: Login) => void;
    signout: () => void;
}>({} as any);

export function useGlobalState() {
    return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState({});

    useEffect(() => {}, []);

    const context = {
        state,
        signin(login: Login) {
            setState((s) => ({ ...s, login }));
        },
        signout() {
            setState((s) => ({ ...s, login: undefined }));
        },
    };

    return <GlobalStateContext.Provider value={context}>{children}</GlobalStateContext.Provider>;
}
