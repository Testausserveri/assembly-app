import {
    PropsWithChildren,
    createContext,
    useContext,
    useState,
} from 'react';

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

export interface ProfilePreferences {
    coins: boolean;
    realName: boolean;
    memberSince: boolean;
    shoutTrophy: boolean;
    questionTrophy: boolean;
    allowShowUsername: boolean;
    openedLootboxesCount: boolean;
}

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
