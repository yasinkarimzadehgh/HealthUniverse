// Action Types
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

// Action Creators
export const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    };
};

export const setTheme = (theme) => {
    return {
        type: SET_THEME,
        payload: theme
    };
};
