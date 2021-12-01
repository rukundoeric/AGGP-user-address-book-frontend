/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import key from "uniqid";
import Item from "../items/ContactsGroupItem";
import { getContacts } from "../../redux/actions/Contacts";
import Input from "../commons/input";

const Contacts = ({
  contacts,
  getContacts,
  history: {
    location: { pathname },
  },
}) => {
  const [contactList, setContactList] = useState({});

  useEffect(() => {
    getContacts();
  }, []);
  useEffect(() => {
    setContactList(contacts.cList);
  }, [contacts.cList]);

  const mlKeys = contactList ? Object.keys(contactList) : [];

  return (
    <div className="contact-list d-flex flex-column">
      {contacts.status === "pending" && (
        <div>
          <div className="progress">
            <div className="indeterminate"> </div>
          </div>
        </div>
      )}
      <div>
        <Input
          type="text"
          id="first_name"
          className="txts-inputs p-4"
          placeholder="Search"
          name="first_name"
          onChange={(e) => {getContacts(e.target.value)}}
          required
        />
      </div>
      <div className="range-list d-flex flex-column">
        {mlKeys.length > 0 &&
          mlKeys.map((objKey) => (
            <Item
              key={key()}
              title={objKey}
              contactList={contactList[objKey]}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  getContacts,
})(Contacts);
