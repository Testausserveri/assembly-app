import { TabBar, TabBarIcon } from '@/components';
import LootboxNavigationButton from '@/elements/lootbox/LootboxNavigationButton';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

export default function TabLayout() {
    const { authLoaded, signout, isAuthenticated } = useGlobalState();

    useEffect(() => {
        if (authLoaded) {
            SplashScreen.hide();
        }
    }, [authLoaded]);

    if (isAuthenticated()) {
        signout();
        return <Redirect href={'/signin'} />;
    }

    return (
        <Tabs
            tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
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
                        <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
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
                name='about'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'information-circle' : 'information-circle-outline'}
                            color={color}
                        />
                    ),
                    // unmountOnBlur: true,
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
