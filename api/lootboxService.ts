// LootboxType
// LootboxStatus
// ItemWonDetails
// WinnableItems
// LootboxItem
// LootboxSkin

type BadRequest = {
    success: "false";
    error: string;
}

type InvalidLootbox = {
    success: "false";
    p: {
        id: number,
        social_login: boolean,
        username: string,
        user_level: number,
        region: string,
        iat: number,
        exp: number
    };
    code: string;
    error: string;
}

type ItemWonDetails = {
    id: number
    item_name: string
    image: string
    coins_won: number
    only_coins: boolean
    description: string
    telia_link_exclusive: boolean
    digital_code: string
    winner_info: string
}


type LootboxSkin =
  | "blue"
  | "gold"
  | "goldLight"
  | "green"
  | "greenLight"
  | "purple"
  | "purpleLight"
  | "purpleWide"
  | "red"
  | "redYellow"
  | "yellowRed"
  | "blueRed"
  | "esportal";

type LootboxItem = {
    id: number | string;
    image: string;
    item_name: string;
    only_coins: boolean;
    coins_won: number;
    telia_link_exclusive: boolean;
    digital_code: string;
    description: string;
    winner_info: string;
}

type WinnableItem = {
    description: string;
    image: string;
    skin: LootboxSkin;
    only_coins: boolean;
    coin_value: number;
    coins_won: number;
    item_name: string;
    lootbox_expires_at: string;
    lootbox_name: string;
    telia_link_exclusive: boolean;
}

type LootboxType = {
    code: string;
    id: number;
    infinite: boolean;
    skin: LootboxSkin;
    lootbox_id: number | string;
    lootbox_name: string;
    created_at: string;
    expires_at: string;
    opened_at: string;
    item_won: LootboxItem;
    item_won_details: LootboxItem;
    status: number;
    items: WinnableItem[];
    winnable_items: WinnableItem[];
    token: string;
}

enum LootboxStatus {
    CLOSED = 1,
    OPENED = 2
}  

const API_BASE_PATH = process.env.EXPO_PUBLIC_ENVIRONMENT ? `https://yusf31nx11.execute-api.eu-west-1.amazonaws.com/staging` : "https://api.series.gg";

// /person/lootboxes
// /lootbox/open/:id/:locale/asm
// /check-code/asm/:code
// /person/claim-lootbox

// GET
export async function getLootboxes(token: string) {
    const url = `${API_BASE_PATH}/person/lootboxes`;
    const response = await fetch(url, {headers: {'Authorization': `Bearer ${token}`}});
    if (response.status !== 200) {
        const error = await response.json();
        throw {message: error.message}
    };
    const data = await response.json();
    return data.data as LootboxType[];
}

// POST
export async function openLootbox(token: string, id: number, locale: string) {
    const url = `${API_BASE_PATH}/lootbox/open/${id}/${locale}/asm`;
    const response = await fetch(url, {method: 'POST', headers: {'Authorization': `Bearer ${token}`}});
    const data = await response.json();
    if (response.status === 200) {
        return data as LootboxType;
    } else if (response.status === 404) {
        return data as BadRequest;
    } else {
        return data;
    }
}

// GET
export async function checkCode(code: string) {
    const url = `${API_BASE_PATH}/lootbox/check-code/asm/${code}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
        return data as LootboxType;
    } else if (response.status === 404) {
        return data as BadRequest;
    } else {
        return data;
    }
}

// POST
export async function claimLootbox(token: string, code: string, lootbox_token?: string) {
    const opts: any = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${token}`
        },
        body: lootbox_token ? { 'code': code, 'token': lootbox_token } : { 'code': code}
    };
    const url = `${API_BASE_PATH}/person/claim-lootbox`;
    const response = await fetch(url, opts);
    const data = await response.json();
    if (response.status === 200) {
        return data as LootboxType;
    } else if (response.status === 403) {
        return data as InvalidLootbox;
    } else {
        return data;
    }
}

export { LootboxType, LootboxItem, LootboxSkin, LootboxStatus, ItemWonDetails, WinnableItem};