import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * Retrieves the favorite events from async storage.
 * @returns A promise that resolves to an array of numbers representing the favorite event ids .
 */
const getFavorites = async (): Promise<number[]> => {
    try {
        const data = await AsyncStorage.getItem('favorite_events');
        if (data) {
            return data.split(';').map((n) => parseInt(n));
        }
    } catch (ex) {
        console.error('Failed to get favorites from async storage:', ex);
    }
    return [];
};

/**
 * Saves the favorite events to async storage.
 *
 * @param {number[]} favorites - The array of favorite event IDs.
 */
const saveFavorites = async (favorites: number[]) => {
    try {
        await AsyncStorage.setItem('favorite_events', favorites.join(';'));
    } catch (ex) {
        console.error('Failed to save favorites to async storage:', ex);
    }
};

/**
 * Hook to manage favorite state for a given eventId.
 *
 * @returns An object containing the current favorites and a function to toggle the favorite state by id.
 */
export const useFavorite = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        getFavorites().then((favorites) => {
            setFavorites(favorites);
        });
    }, []);

    const toggle = async (id: number) => {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id]);
            await saveFavorites([...favorites, id]);
        } else {
            setFavorites(favorites.filter((n) => n !== id));
            await saveFavorites(favorites.filter((n) => n !== id));
        }
    };

    return { favorites, toggle };
};
