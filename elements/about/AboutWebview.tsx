import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

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

const AboutWebview = () => {
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const uri = `https://assembly.org/${i18n.language}/about`;

    return (
        <>
            {loading && <ActivityIndicator animating />}
            <WebView
                style={{
                    display: loading ? 'none' : 'flex',
                }}
                onLoad={() => setLoading(false)}
                source={{ uri }}
                injectedJavaScript={injectedJavascript}
            />
        </>
    );
};

export default AboutWebview;
