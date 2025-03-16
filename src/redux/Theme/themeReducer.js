import { SET_DARK_MODE, SET_LIGHT_MODE } from './themeAction';

const lightTheme = {
    primary: '#2980b9',
    background: '#ebeaea',
    card: '#FFFFFF',
    text: '#1E2132',
    textSecondary: '#697386',
    textMuted: '#95a5a6',
    border: '#E0E4EB',
    error: '#be4859',
    success: '#27ae60',
    warning: '#f39c12',
    infoCard: '#ebf7fd',
    info: '#3498db',
    buttonDisabled: '#a5b7c4',
    searchBackground: '#FFFFFF',
    headerBackground: '#2980b9',
    headerText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: '#ddd',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
    primary: '#3498db',
    background: '#141414',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#777777',
    border: '#333333',
    error: '#be4859',
    success: '#2ecc71',
    warning: '#f1c40f',
    infoCard: '#1E1E1E',
    info: '#3498db',
    buttonDisabled: '#333333',
    searchBackground: '#2A2A2A',
    headerBackground: '#1A1A1A',
    headerText: '#FFFFFF',
    cardBackground: '#2A2A2A',
    inputBackground: '#2A2A2A',
    inputBorder: '#444444',
    shadow: 'rgba(0, 0, 0, 0.3)',
};

const initialState = {
    isDark: false,
    theme: lightTheme,
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {
                ...state,
                theme: darkTheme,
            };

        case SET_LIGHT_MODE:
            return {
                ...state,
                theme: lightTheme,
            };
        default:
            return state;
    }
};

export default themeReducer;