const determineEvent = (): string => {
    if (process.env.EXPO_PUBLIC_ENVIRONMENT === 'development') {
        return 'summer23';
    }
    const now = new Date();
    const julyFirst = new Date(now.getFullYear(), 7, 1);
    const shortYear = now.getFullYear().toString().slice(-2);

    if (now >= julyFirst) {
        return 'summer' + shortYear;
    } else {
        return 'winter' + shortYear;
    }
};

const API_BASE_PATH = `https://wp.assembly.org/${determineEvent()}/index.php?rest_route=/api/v1`;

export {determineEvent, API_BASE_PATH};
