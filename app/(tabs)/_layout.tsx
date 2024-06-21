import { TabBar, TabBarIcon } from '@/components';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
    const { t } = useTranslation();
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: t('home'),
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='timetable'
                options={{
                    title: t('timetable'),
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'calendar' : 'calendar-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
