import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { DimensionValue, Image, View } from 'react-native';

function EventMap() {
    return (
        <ReactNativeZoomableView
            maxZoom={0.3}
            minZoom={0.05}
            zoomStep={0.5}
            initialZoom={0.05}
            bindToBorders={true}
            style={{ width: 'fit-content' as DimensionValue }}
            // Image dimensions
            contentWidth={10000}
            contentHeight={5625}
        >
            <View style={{ width: '100%' }}>
                <Image source={require('@/assets/images/winter25-aluekartta.png')} />
            </View>
        </ReactNativeZoomableView>
    );
}

export default EventMap;
