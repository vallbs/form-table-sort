import * as actionTypes from '../actions/actionTypes';
import * as helper from './reducerHelpers';

const initialState = {
    contacts: [],
    isProcessing: false,
    hasErrored: false,
    sortField: null,
    sortDirectionAsc: null
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
        case actionTypes.SORT_CONTACT_DATA:
            return {
                ...state,
                contacts: helper.sortData(
                    action.payload.contacts, 
                    state.sortField, 
                    action.payload.sortField,
                    state.sortDirectionAsc),
                sortField: action.payload.sortField,
                sortDirectionAsc: helper.computeSortDirectionAsc(
                    state.sortField, 
                    action.payload.sortField,
                    state.sortDirectionAsc
                )

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