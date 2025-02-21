import dayjs from 'dayjs';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NotificationTriggerInput } from 'expo-notifications';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

interface ILocalNotificationHook {
    expoPushToken: string | undefined;
    notification: Notifications.Notification;
}

/**
 * Custom hook for managing local notifications and ensuring permissions are correctly set.
 *
 * @returns An object containing the Expo push token and the current notification.
 */
export const useLocalNotification = (): ILocalNotificationHook => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({} as Notifications.Notification);
    const notificationListener = useRef<Notifications.Subscription | undefined>();
    const responseListener = useRef<Notifications.Subscription | undefined>();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token || '');
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                setNotification(response.notification);
            }
        );

        return () => {
            if (notificationListener.current?.remove) {
                notificationListener.current.remove();
            }
            if (responseListener.current?.remove) {
                responseListener.current.remove();
            }
        };
    }, []);

    return { expoPushToken, notification };
};

/**
 * Schedules a push notification for a given event. Notification is set 15 minutes before given start date.
 * @param eventTitle - The title of the event.
 * @param start - The start date of the event.
 */
export const schedulePushNotification = async (id: number, eventTitle: string, start: Date) => {
    const quarterBeforeStart = dayjs(start).subtract(15, 'minutes');
    const timeDifference = Math.round(dayjs(quarterBeforeStart).diff(new Date(), 'seconds'));

    await Notifications.scheduleNotificationAsync({
        identifier: id.toString(),
        content: { title: `${eventTitle}`, subtitle: '', body: t('event-starting-15') },
        trigger: { seconds: timeDifference } as NotificationTriggerInput,
    });
};

/**
 * Cancels a scheduled push notification with the specified event title.
 *
 * @param eventTitle - The title of the event associated with the push notification.
 * @returns A promise that resolves when the notification is successfully canceled.
 */
export const cancelScheduledPushNotification = async (id: number) => {
    await Notifications.cancelScheduledNotificationAsync(id.toString());
};

/**
 * Registers the device for push notifications and returns the push token.
 * @returns A promise that resolves to the push token.
 */
export const registerForPushNotificationsAsync = async () => {
    let token: string = '';

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FFAABBCC',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
};
