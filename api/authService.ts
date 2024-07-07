import {determineEvent, API_BASE_PATH} from './helper';

const API_BASE_PATH = process.env.LOGIN_URL;

type Person = {
    id: number;
    email: string | null;
    phone: string | null;
    created_at: string;
    first_name: string;
    last_name: string;
    extra: PersonExtra;
    status: PersonStatus;
    verified_at: string;
    username: string;
    is_banned: boolean;
    user_level: PersonLevel;
    marketing_box_granted: boolean;
    profile_preferences: ProfilePreferences;
    region: “asm”;
    opened_lootboxes_count: number;
};

type PersonExtra = {
    country?: string | null;
    zipcode?: string | null;
    dateOfBirth?: string | null;
    optIn?: PersonExtraOptIn | null;
    smsPermission?: boolean | null;
    phonePermission?: boolean | null;
    letterPermission?: boolean | null;
};

type ProfilePreferences = {
    realName: boolean;
    memberSince: boolean;
    coins: boolean;
    shoutTrophy: boolean;
    questionTrophy: boolean;
    openedLootboxesCount: boolean;
    allowShowUsername: boolean;
};

/**
 * This function returns a promise for a user logging in with a username and password
 *
 * @returns {Promise<Person>}
 */
const logInUsernamePassword = async (login: string, password: string): Promise<Person> => {
    try {
        const login_resp = await fetch(API_BASE_PATH + '/auth/local?region=asm',{
            method: 'post',
            body: JSON.stringify({
                'login' : login,
                'password' : password
            })
        });
        if (!login_resp.ok) return [];
        const person: Person = await login_resp.json();

        return person;
    } catch (e) {
        console.error(e);
        return [];
    }
};
