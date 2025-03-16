import { TOGGLE_THEME, SET_THEME } from "./themeActions"

const initialState = {
    darkMode: false,
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        case SET_THEME:
            return {
                ...state,
                darkMode: action.payload === "dark",
            }
        default:
            return state
    }
}

export default themeReducer

