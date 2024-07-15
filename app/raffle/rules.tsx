import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
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

function RaffleRules() {
    const { i18n } = useTranslation();
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const uri = `https://assembly.org/${i18n.language}/raffle-rules`;

    return (
        <Surface
            style={{
                height: '100%',
                backgroundColor: theme.colors.background,
            }}
        >
            {loading && <ActivityIndicator animating />}
            <WebView
                style={{
                    display: loading ? 'none' : 'flex',
                }}
                onLoad={() => setLoading(false)}
                source={{ uri }}
                injectedJavaScript={injectedJavascript}
            />
        </Surface>
    );
}

export default RaffleRules;
