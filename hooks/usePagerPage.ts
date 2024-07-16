import { useEvent, useHandler } from 'react-native-reanimated';

export function usePagerPageHandler(handlers: any, dependencies?: any) {
    const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
    const subscribeForEvents = ['onPageSelected'];

    return useEvent<any>(
        (event) => {
            'worklet';
            const { onPageSelected } = handlers;
            if (onPageSelected && event.eventName.endsWith('onPageSelected')) {
                onPageSelected(event, context);
            }
        },
        subscribeForEvents,
        doDependenciesDiffer
    );
}
