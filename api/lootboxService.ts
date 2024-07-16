import { StatusError } from './errors';

export type PersonLootbox = {
    Id: number;
    status: LootboxStatus;
    lootbox_id: number;
    opened_at: string;
    item_won: number;
    item_won_details: ItemWonDetails;
    created_at: string;
    expires_at: string;
    skin: LootboxSkin;
    lootbox_name: string;
};

enum LootboxStatus {
    CLOSED = 1,
    OPENED = 2,
}

type Filters = {
    only_coins?: boolean;
    id?: string;
    status?: LootboxStatus;
    code?: string;
};

type Pagination = {
    page: number;
    perPage: number;
};

type Sort = {
    field: string;
    order: 'asc' | 'desc';
};

type ItemWonDetails = {
    id: number;
    item_name: string;
    image: string;
    coins_won: number;
    only_coins: boolean;
    description: string;
    telia_link_exclusive: boolean;
    digital_code: string;
    winner_info: string;
};

type LootboxSkin =
    | 'blue'
    | 'gold'
    | 'goldLight'
    | 'green'
    | 'greenLight'
    | 'purple'
    | 'purpleLight'
    | 'purpleWide'
    | 'red'
    | 'redYellow'
    | 'yellowRed'
    | 'blueRed'
    | 'esportal';

const API_BASE_PATH = process.env.EXPO_PUBLIC_API_URL;

// /person/lootboxes
// TODO /lootbox/open/:id/:locale/asm
// TODO /check-code/asm/:code
// TODO /person/claim-lootbox

// GET
export async function getLootboxes(token: string) {
    const url = `${API_BASE_PATH}/person/lootboxes`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) {
        throw new StatusError('lootbox-fetch-failed', response.status);
    }
    const data = await response.json();
    return data as PersonLootbox[];
}
