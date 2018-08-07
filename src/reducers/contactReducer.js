import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contacts: []
}

const contactReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            return action.payload.contacts;
        default:
            return state;;
    }
    
}

export default contactReducer;