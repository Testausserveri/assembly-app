import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import TabBar from '@/components/TabBar';

export default function TabLayout() {
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
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='other'
                options={{
                    title: 'Other',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'egg' : 'egg-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
