import { determineEvent } from './eventService';

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

const API_BASE_PATH = `https://wp.assembly.org/${determineEvent()}/index.php?rest_route=/api/v1`;

// TODO: remove me
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getOpenedLootboxes = async (token: string): Promise<PersonLootbox[]> => {
    // const response = await fetch(API_BASE_PATH + '/person/lootboxes', {
    //     headers: { Authentication: `Bearer ${token}` },
    // });
    // const data = await response.json();
    // return data;

    await sleep(1000);
    return Array(10).fill({
        created_at: new Date().toISOString(),
        expires_at: new Date().toISOString(),
        opened_at: new Date().toISOString(),
        Id: 1,
        lootbox_id: 1,
        item_won: 1,
        lootbox_name: 'Bonus Box',
        skin: 'blue',
        status: LootboxStatus.OPENED,
        item_won_details: {
            id: 1,
            image: 'https://asmcommunity.imgix.net/production/ence-muki.png?auto=format&fit=clip&ixlib=react-9.4.0&h=100&w=100',
            coins_won: 0,
            description: 'Musta keraaminen muki ENCEn neliölogolla. Tilavuus 350 ml.',
            item_name: 'ENCE muki',
            digital_code: '123',
            only_coins: false,
            telia_link_exclusive: false,
            winner_info: 'abc',
        },
    });
};
