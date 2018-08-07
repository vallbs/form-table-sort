import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contacts: [],
    isProcessing: false,
    hasErrored: false
}

const contactReducer = ( state = initialState, action ) => {
    let contacts = null;
    switch(action.type) {
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload.contacts
            }
        case actionTypes.CREATE_CONTACT_SUCCESS:
            console.log("CREATE_CONTACT_SUCCESS", action);
            contacts = [
                ...state.contacts,
                action.payload.contact
            ]
            console.log("contacts", contacts);

            return {
                ...state,
                contacts
            }
        case actionTypes.DELETE_CONTACT_SUCCESS:
            console.log("DELETE_CONTACT_SUCCESS", action);
            contacts = state.contacts.filter(contact => {
                return contact.id !== action.payload.contactId;
            });
            console.log("contacts", contacts);

            return {
                ...state,
                contacts
            }
        case actionTypes.CONTACTS_IS_PROCESSING:
            return {
                ...state,
                isProcessing: action.payload.isProcessing
            }
        case actionTypes.CONTACTS_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.payload.hasErrored
            }
        default:
            return state;;
    }
    
}

export default contactReducer;