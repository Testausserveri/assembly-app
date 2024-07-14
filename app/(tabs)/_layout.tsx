import { TabBar, TabBarIcon } from '@/components';
import LootboxNavigationButton from '@/elements/lootbox/LootboxNavigationButton';
import { Tabs } from 'expo-router';
import React from 'react';

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
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'calendar' : 'calendar-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='map'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'map' : 'map-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='lootbox'
                options={{
                    tabBarIcon: ({ focused }) => <LootboxNavigationButton focused={focused} />,
                }}
            />
            <Tabs.Screen
                name='info'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='user'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
