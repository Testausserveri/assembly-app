import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

const TabBar = (props: BottomTabBarProps) => {
    const theme = useTheme();
    return (
        <BottomNavigation.Bar
            style={{ backgroundColor: theme.colors.primaryContainer }}
            shifting
            activeColor={ theme.colors.primary }
            activeIndicatorStyle={{ backgroundColor: 'transparent' }}
            navigationState={props.state}
            safeAreaInsets={props.insets}
            labeled={false}
            onTabPress={({ route, preventDefault }) => {
                const event = props.navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                    preventDefault();
                } else {
                    props.navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: props.state.key,
                    });
                }
            }}
            renderIcon={({ route, focused, color }) => {
                const { options } = props.descriptors[route.key];
                if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                }

                return null;
            }}
        />
    );
};

export default TabBar;
