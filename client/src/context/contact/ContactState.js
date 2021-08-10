import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ted Jonson',
        email: 'tjson@gmail.com',
        phone: '222-222-222',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Sara Smith',
        email: 'ssmith@gmail.com',
        phone: '111-111-111',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add contact
  const addContact = (contact) => {
    contact.id = uuidv4()

    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update contact
  const updateContact = (contact) => {
    dispatch({ type: SET_CURRENT })

    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    })
  }

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
