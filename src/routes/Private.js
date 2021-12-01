import React from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import Contacts from '../components/fragments/Contacts';
import NewContacts from '../components/fragments/NewContact';
import ContactDetails from '../components/fragments/ContactDetails';

const redirectToContacts = () => <Redirect to="/contacts" />;

class Routes {
  constructor() {
    this.routes = [
      {
        path: '/',
        name: 'Contacts',
        icon: 'ti-loop',
        Component: redirectToContacts,
        type: 'application',
        access: ['admin', 'moderator', 'user'],
      },
      {
        path: '/contacts',
        name: 'Contacts',
        icon: 'ti-loop',
        Component: Contacts,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/new-contact',
        name: 'Add Contact',
        icon: 'ti-plus',
        Component: NewContacts,
        type: 'navigation',
        access: ['admin', 'user'],
      },
      {
        path: '/contacts/:id',
        name: 'Contact details',
        icon: 'ti-plus',
        Component: ContactDetails,
        type: 'model',
        access: ['admin', 'user'],
      }
    ];
  }

  filter(key, value, isArray) {
    if (isArray) {
      this.routes = this.routes.filter(object => object[key].includes(value));
    } else {
      const object = {};
      object[key] = `${value}`;
      this.routes = _.filter(this.routes, object);
    }
    return this;
  }

  get(args) {
    const currentList = this.routes;
    if (currentList.length === 0) {
      return -1;
    }
    if (args) {
      return currentList.map(item => _.pick(item, ...args));
    }
    return currentList;
  }
}

export const modelRoutes = () => new Routes().get();

export const navigationRoutes = () => {
  const routes = new Routes()
    .filter('type', 'navigation')
    .get();
  return routes;
};
