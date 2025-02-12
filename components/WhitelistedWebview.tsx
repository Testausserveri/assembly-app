import { useNavigation } from '@react-navigation/native';
import { useTrackingPermissions } from 'expo-tracking-transparency';
import { useEffect, useRef } from 'react';
import { BackHandler, Linking, Platform } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';

type WhitelistedWebviewProps = {
    whitelistedUrls: RegExp[];
} & WebViewProps;

// Hide some elements from the page to prevent user navigation
// and to make webview feel more like native experience
const injectedJavascript = `(function() {
    // Navbar and footer
    document.querySelector("nav").style.display = "none";
    document.querySelector("footer").style.display = "none";

    // Breadcrumbs index page (bit hacky but the best way I could find)
    document.querySelectorAll("ul.e9onl6k3")[0].style.display = "none";
    document.querySelectorAll("ul.e9onl6k3")[1].style.display = "none";
})();`;

function WhitelistedWebview({ whitelistedUrls, ...props }: WhitelistedWebviewProps) {
    const [status, requestPermission] = useTrackingPermissions();
    const webviewRef = useRef<WebView | null>(null);
    const navigation = useNavigation();

    const onAndroidBackPress = () => {
        if (webviewRef.current) {
            webviewRef.current.goBack();
            return true; // prevent default behavior (exit app)
        }
        return false;
    };

    useEffect(() => {
        // @ts-ignore
        const unsubscribe = navigation.addListener('tabPress', () => {
            if (webviewRef.current) {
                webviewRef.current.goBack();
            }
        });

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
                if (unsubscribe) unsubscribe();
            };
        }
    }, [navigation]);

    useEffect(() => {
        (async () => {
            await requestPermission();
        })();
    }, [requestPermission]);

    return (
        <WebView
            {...props}
            ref={webviewRef}
            sharedCookiesEnabled={status?.granted}
            thirdPartyCookiesEnabled={status?.granted}
            injectedJavaScript={injectedJavascript}
            onNavigationStateChange={(newNavState) => {
                let foundMatch = whitelistedUrls.find((regex) => regex.test(newNavState.url));

                if (!foundMatch) {
                    Linking.openURL(newNavState.url);
                    webviewRef.current?.stopLoading();
                    webviewRef.current?.goBack();
                    return;
                }

                webviewRef.current?.injectJavaScript(injectedJavascript);

                props.onNavigationStateChange?.(newNavState);
            }}
        />
    );
}

export default WhitelistedWebview;
