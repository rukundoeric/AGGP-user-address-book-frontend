const API = 'https://address-book-b.herokuapp.com/';

// For Users
export const login = `${API}/auth`;
export const signup = `${API}/user`;

// For Contacts
export const contacts = `${API}/contacts`;
export const contact = id => `${API}/contacts/${id}`;


