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
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'calendar' : 'calendar-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='useless'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
