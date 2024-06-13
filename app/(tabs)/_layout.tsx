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
                name='other'
                options={{
                    title: t('other'),
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'egg' : 'egg-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
