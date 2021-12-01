import { contact, contacts } from './_api';
import request from './_request';

export const createContact = (body) => async dispach => {
  dispach({ type: 'CREATE_CONTACT', status: 'pending' });
  try {
    const { data } = await request('post', contacts, body);
    dispach({
      type: 'CREATE_CONTACT',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'CREATE_CONTACT', payload: error, status: 'fail' });
  }
};

export const updateContact = (id, body) => async dispach => {
  dispach({ type: 'UPDATE_CONTACT', status: 'pending' });
  try {
    const { data } = await request('put', contact(id), body);
    dispach({
      type: 'UPDATE_CONTACT',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'UPDATE_CONTACT', payload: error, status: 'fail' });
  }
};

export const getContacts = (q) => async dispach => {
  dispach({ type: 'GET_CONTACTS', status: 'pending' });
  try {
    const { data } = await request('get', `${q? contacts+`?q=${q}` : contacts}`);
    console.log(data);
    dispach({
      type: 'GET_CONTACTS',
      payload: data.contacts,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_CONTACTS', payload: error, status: 'fail' });
  }
};

export const getSingleContact = (id) => async dispach => {
  dispach({ type: 'GET_CONTACT', status: 'pending' });
  try {
    const { data } = await request('get', contact(id));
    dispach({
      type: 'GET_CONTACT',
      payload: data.contact,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'GET_CONTACT', payload: error, status: 'fail' });
  }
};

export const deleteContact = (id) => async dispach => {
  console.log(id)
  dispach({ type: 'DELETE_CONTACT', status: 'pending' });
  try {
    const { data } = await request('delete', contact(id));
    dispach({
      type: 'DELETE_CONTACT',
      payload: data,
      status: 'success',
    });
  } catch (error) {
    dispach({ type: 'DELETE_CONTACT', payload: error, status: 'fail' });
  }
};