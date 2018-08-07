import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contacts: [],
    isLoading: false,
    hasErrored: false
}

const contactReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            console.log("FETCH_CONTACTS_SUCCESS", action);
            return {
                ...state,
                contacts: action.payload.contacts
            }
        case actionTypes.CONTACTS_IS_LOADING:
            console.log("CONTACTS_IS_LOADING", action);
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case actionTypes.CONTACTS_HAS_ERRORED:
            console.log("CONTACTS_HAS_ERRORED", action);
            return {
                ...state,
                hasErrored: action.payload.hasErrored
            }
        default:
            return state;;
    }
    
}

export default contactReducer;