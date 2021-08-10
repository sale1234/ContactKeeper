import { useReducer } from 'react'
// import uudi from 'uudi'
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
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
