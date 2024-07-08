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
 * @param id - The ID of the event to track favorite state for.
 * @returns An object containing the current favorite state and a function to toggle the favorite state.
 */
export const useFavorite = (id: number) => {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        getFavorites().then((favorites) => {
            setFavorite(favorites.includes(id));
        });
    }, [id]);

    const toggle = async () => {
        let favorites = await getFavorites();

        if (favorite) {
            favorites.push(id);
        } else {
            favorites.filter((f) => f !== id);
        }

        saveFavorites(favorites);
        // Trigger redraw
        setFavorite(!favorite);
    };

    return { favorite, toggle };
};
