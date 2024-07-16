import { StatusError } from '@/api/errors';
import { PersonLootbox, getLootboxes } from '@/api/lootboxService';
import { useEffect, useState } from 'react';

const getParts = ({ skin }: { skin: string }) => {
    if (skin === 'blue') {
        return {
            top: require('@/assets/images/lootbox/blue/top.png'),
            bottom: require('@/assets/images/lootbox/blue/bottom.png'),
        };
    } else if (skin === 'gold') {
        return {
            top: require('@/assets/images/lootbox/gold/top.png'),
            bottom: require('@/assets/images/lootbox/gold/bottom.png'),
        };
    } else if (skin === 'goldLight') {
        return {
            top: require('@/assets/images/lootbox/gold-light/top.png'),
            bottom: require('@/assets/images/lootbox/gold-light/bottom.png'),
        };
    } else if (skin === 'green') {
        return {
            top: require('@/assets/images/lootbox/green/top.png'),
            bottom: require('@/assets/images/lootbox/green/bottom.png'),
        };
    } else if (skin === 'greenLight') {
        return {
            top: require('@/assets/images/lootbox/green-light/top.png'),
            bottom: require('@/assets/images/lootbox/green-light/bottom.png'),
        };
    } else if (skin === 'purple') {
        return {
            top: require('@/assets/images/lootbox/purple/top.png'),
            bottom: require('@/assets/images/lootbox/purple/bottom.png'),
        };
    } else if (skin === 'purpleLight') {
        return {
            top: require('@/assets/images/lootbox/purple-light/top.png'),
            bottom: require('@/assets/images/lootbox/purple-light/bottom.png'),
        };
    } else if (skin === 'purpleWide') {
        return {
            top: require('@/assets/images/lootbox/purple-wide/top.png'),
            bottom: require('@/assets/images/lootbox/purple-wide/bottom.png'),
        };
    } else if (skin === 'red') {
        return {
            top: require('@/assets/images/lootbox/red/top.png'),
            bottom: require('@/assets/images/lootbox/red/bottom.png'),
        };
    } else if (skin === 'redYellow') {
        return {
            top: require('@/assets/images/lootbox/red-yellow/top.png'),
            bottom: require('@/assets/images/lootbox/red-yellow/bottom.png'),
        };
    } else if (skin === 'yellowRed') {
        return {
            top: require('@/assets/images/lootbox/yellow-red/top.png'),
            bottom: require('@/assets/images/lootbox/yellow-red/bottom.png'),
        };
    } else if (skin === 'blueRed') {
        return {
            top: require('@/assets/images/lootbox/blue-red/top.png'),
            bottom: require('@/assets/images/lootbox/blue-red/bottom.png'),
        };
    } else if (skin === 'esportal') {
        return {
            top: require('@/assets/images/lootbox/esportal/top.png'),
            bottom: require('@/assets/images/lootbox/esportal/bottom.png'),
        };
    }
};

interface PersonLootboxes {
    lootboxes: PersonLootbox[];
    status: 'loading' | 'error' | 'success';
    message?: string;
}

export const useLootboxes = (token: string | null) => {
    const [lootboxes, setLootboxes] = useState<PersonLootboxes>({
        lootboxes: [],
        status: 'loading',
    });

    const reloadLootboxes = () => {
        if (token) {
            setLootboxes({ status: 'loading', lootboxes: lootboxes.lootboxes });
            getLootboxes(token).then(
                (data) => setLootboxes({ lootboxes: data, status: 'success' }),
                (e) => {
                    if (e instanceof StatusError) {
                        setLootboxes({ lootboxes: [], status: 'error', message: e.message });
                    } else {
                        setLootboxes({ lootboxes: [], status: 'error', message: 'unknown-error' });
                    }
                }
            );
        }
    };

    useEffect(() => {
        if (token) {
            getLootboxes(token).then(
                (data) => setLootboxes({ lootboxes: data, status: 'success' }),
                (e) => {
                    if (e instanceof StatusError) {
                        setLootboxes({ lootboxes: [], status: 'error', message: e.message });
                    } else {
                        setLootboxes({ lootboxes: [], status: 'error', message: 'unknown-error' });
                    }
                }
            );
        }
    }, [token]);

    return { getParts, lootboxes, reloadLootboxes };
};
