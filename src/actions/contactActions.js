import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchContacts = (url) => {
    return dispatch => {
        dispatch(contactsIsLoading(true));

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
                dispatch(contactsIsLoading(false));
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

export const contactsIsLoading = (bool) => {
    return {
        type: actionTypes.CONTACTS_IS_LOADING,
        payload: { isLoading: bool }
    }
}

export const contactsHasErrored = (bool) => {
    return {
        type: actionTypes.CONTACTS_HAS_ERRORED,
        payload: { hasErrored: bool }
    }
}