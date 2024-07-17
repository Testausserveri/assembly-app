import { useRef } from 'react';
import { Linking } from 'react-native';
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
    document.querySelectorAll(".css-1ln5cin.e9onl6k0")[0].style.display = "none";
    document.querySelectorAll(".css-1ln5cin.e9onl6k0")[1].style.display = "none";
})();`;

function WhitelistedWebview({ whitelistedUrls, ...props }: WhitelistedWebviewProps) {
    const webviewRef = useRef<WebView | null>(null);

    return (
        <WebView
            {...props}
            ref={webviewRef}
            injectedJavaScript={injectedJavascript}
            onNavigationStateChange={(newNavState) => {
                let foundMatch = false;
                for (const whitelistedUrl of whitelistedUrls) {
                    if (whitelistedUrl.test(newNavState.url)) {
                        foundMatch = true;
                        break;
                    }
                }
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
