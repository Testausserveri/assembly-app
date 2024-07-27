import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Image, View } from 'react-native';

function EventMap() {
    return (
        <ReactNativeZoomableView
            maxZoom={2.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={0.5}
            bindToBorders={true}
            style={{
                width: 'fit-content',
            }}
            // Image dimensions
            contentWidth={1024}
            contentHeight={576}
        >
            <View style={{ width: '100%' }}>
                <Image
                    style={{ objectFit: 'contain' }}
                    source={require('@/assets/images/summer23-aluekartta.png')}
                />
            </View>
        </ReactNativeZoomableView>
    );
}

export default EventMap;
