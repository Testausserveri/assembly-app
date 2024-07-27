import { ImageBackground, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface LootboxNavigationButtonProps {
    focused: boolean;
}

function LootboxNavigationButton({ focused }: LootboxNavigationButtonProps) {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'black',
                height: '250%',
                aspectRatio: '1/1',
                // top: '-150%', for 'floating' effect
                top: '-75%',
                borderRadius: 10000,
                overflow: 'hidden',
            }}
        >
            <ImageBackground
                source={require('@/assets/images/haze.png')}
                style={{
                    height: '100%',
                    opacity: focused ? 1 : 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icon size={40} source='cube' />
            </ImageBackground>
        </View>
    );
}

export default LootboxNavigationButton;
