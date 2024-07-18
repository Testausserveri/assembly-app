import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

type FavoriteStore = {
    hydrated: boolean;
    setHydrated: (value: boolean) => void;
    favorites: Record<string, boolean | undefined>;
    setFavorite: (id: number, value: boolean) => void;
};

const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set) => ({
            hydrated: false,
            setHydrated: (value) => set({ hydrated: value }),
            favorites: {},
            setFavorite: (id, value) =>
                set((state) => ({
                    favorites: { ...state.favorites, [id.toString(10)]: value || undefined },
                })),
        }),
        {
            name: 'favoriteEvents',
            onRehydrateStorage: () => (state) => state?.setHydrated(true),
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

/**
 * Hook to manage favorite state for a given eventId.
 *
 * @param id - The ID of the event to track favorite state for.
 * @returns An object containing the current favorite state and a function to set the favorite state.
 */
export const useFavorite = (id: number) => {
    const idStr = id.toString(10);

    const [isFavorite, setFavorite] = useFavoriteStore(
        useShallow((state) => {
            return [state.favorites[idStr] ?? false, state.setFavorite];
        })
    );

    const setIsFavorite = useCallback(
        (value: boolean) => {
            setFavorite(id, value);
        },
        [id, setFavorite]
    );

    return useMemo(() => ({ isFavorite, setIsFavorite }), [isFavorite, setIsFavorite]);
};

/**
 * Hook to get the current favorite store status.
 * @returns An object containing the current hydration status.
 */
export const useFavoriteStoreStatus = () => {
    const hydrated = useFavoriteStore((state) => state.hydrated);

    return useMemo(() => ({ hydrated }), [hydrated]);
};
