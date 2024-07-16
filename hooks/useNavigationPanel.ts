import { useCallback, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import type {
    default as PagerView,
    PagerViewOnPageSelectedEventData,
} from 'react-native-pager-view';

export type UseNavigationPanelProps = ReturnType<typeof useNavigationPanel>;

export function useNavigationPanel(onPageSelectedCallback: (position: number) => void = () => {}) {
    const ref = useRef<PagerView>(null);
    const [activePage, setActivePage] = useState(0);
    const [isAnimated, setIsAnimated] = useState(true);
    const onPageSelectedPosition = useRef(new Animated.Value(0)).current;

    const setPage = useCallback(
        (page: number) =>
            isAnimated ? ref.current?.setPage(page) : ref.current?.setPageWithoutAnimation(page),
        [isAnimated]
    );

    const nextPage = () => setPage(activePage + 1);
    const previousPage = () => setPage(activePage - 1);

    const onPageSelected = useMemo(
        () =>
            Animated.event<PagerViewOnPageSelectedEventData>(
                [{ nativeEvent: { position: onPageSelectedPosition } }],
                {
                    listener: ({ nativeEvent: { position } }) => {
                        setActivePage(position);
                        onPageSelectedCallback(position);
                    },
                    useNativeDriver: true,
                }
            ),
        []
    );

    return {
        ref,
        activePage,
        nextPage,
        previousPage,
        isAnimated,
        setPage,
        onPageSelected,
    };
}
