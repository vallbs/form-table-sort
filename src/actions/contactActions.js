import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchContacts = (url) => {
    return dispatch => {
        dispatch(contactsIsProcessing(true));

        let contacts = null;

        axios.get(url + ".json")
            .then(response => {
                const data = response.data;
                contacts = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    }
                });

                // console.log(contacts);
                dispatch(fetchContactsSuccess(contacts));
                dispatch(contactsIsProcessing(false));
            })
            .catch(error => {
                dispatch(contactsHasErrored(true));
            });
    }
}

export const deleteContact = (contactId) => {
    return dispatch => {
        dispatch(contactsIsProcessing(false));

        axios.delete("/contacts/" + contactId + ".json")
            .then(response => {
                dispatch(deleteContactSuccess(contactId));
                dispatch(contactsIsProcessing(true));
            })
            .catch(error => {
                dispatch(contactsHasErrored(true));
            });
    }
}

export const createContact = (contact) => {
    //console.log("createContact");
    return dispatch => {
        dispatch(contactsIsProcessing(false));

        axios.post("/contacts.json", contact)
            .then(response => {
                dispatch(createContactSuccess(contact));
                dispatch(contactsIsProcessing(true));
            })
            .catch(error => {
                dispatch(contactsHasErrored(true));
            });
    }
}

const fetchContactsSuccess = (contacts) => {
    return {
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
        payload: { contacts }
    }
}

const deleteContactSuccess = (contactId) => {
    return {
        type: actionTypes.DELETE_CONTACT_SUCCESS,
        payload: { contactId }
    }
}

const createContactSuccess = (contact) => {
    return {
        type: actionTypes.CREATE_CONTACT_SUCCESS,
        payload: { contact }
    }
}

const createContactSuccess = (contact) => {
    return {
        type: actionTypes.CREATE_CONTACT_SUCCESS,
        payload: { contact }
    }
}

export const contactsIsProcessing = (bool) => {
    return {
        type: actionTypes.CONTACTS_IS_PROCESSING,
        payload: { isProcessing: bool }
    }
}

export const contactsHasErrored = (bool) => {
    return {
        type: actionTypes.CONTACTS_HAS_ERRORED,
        payload: { hasErrored: bool }
    }
}