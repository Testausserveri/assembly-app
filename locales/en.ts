const locale: Locale = {
    translation: {
        home: 'Home',
        timetable: 'Timetable',
        // TODO: Intentionally left empty, should be removed
        //  once the login view is moved away from the tab navigator.
        login: '',
        auth: {
            joinUs: 'Join Us',
            email: 'Email',
            registerWithEmail: 'Register with Email',
            registerNewAccount: 'Register a new account',
            acceptTerms:
                'I accept the <tos>terms of service</tos> and have read the <privacy>privacy policy</privacy>.',
            tosUrl: 'https://assembly.org/en/terms-of-service',
            privacyUrl: 'https://assembly.org/en/privacy',
            dontHaveAnAccountYet: 'No account yet?',
            goToSignUp: 'Sign up!',
            alreadyHaveAnAccount: 'Already have an account?',
            goToLogin: 'Go to login',
        },
        location: 'Location',
        time: 'Time',
        'select-language': 'Select Language',
        finnish: 'Finnish',
        english: 'English',
        'success-lang-change': 'Language changed successfully',
        'error-lang-change': 'Error changing language',
    },
};

export default locale;
