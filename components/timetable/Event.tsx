import { Image, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface EventProps {
    title: string;
    location: string;
    time: string;
    color: string;
    thumbnail: string;
}

const Event = ({ title, location, time, color, thumbnail }: EventProps) => {
    return (
        <Surface
            style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: color,
            }}
        >
            <Image
                source={{ uri: thumbnail }}
                resizeMode='cover'
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '97%',
                    justifyContent: 'center',
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: '97%',
                    height: '100%',
                    top: 0,
                    right: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }}
            />
            <Surface style={{ padding: 16, width: '100%', alignItems: 'center' }}>
                <Text variant='titleLarge'>{title}</Text>
                <Text variant='labelLarge'>{location}</Text>
                <Text variant='labelLarge'>{time}</Text>
            </Surface>
        </Surface>
    );
};

export default Event;
