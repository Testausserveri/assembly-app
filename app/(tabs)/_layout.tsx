import { TabBar, TabBarIcon } from '@/components';
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
                name='useless'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='about'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
