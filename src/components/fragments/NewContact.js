import React, { useState, useEffect, useRef } from "react";
import ContactInfoAdd from "../items/ContactInfoAdd";
import Input from "../commons/input";
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createContact } from '../../redux/actions/Contacts';

const NewContact = ({
  contacts: { ccResponse },
  createContact,
  history: { push },
}) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phonenumbers, setPhoneNumbers] = useState([])
  const [emails, setEmails] = useState([])
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const progressBar = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    switch (ccResponse.status) {
      case 'success':
        progressBar.current.classList.add('hidden');
        toast.success('New contact added successfully');
        dispatch({ type: 'C_C_RESET' });
        push('/contacts');
        break;
      default:
    }
  }, [ccResponse.status]);

  const handleData = (data, title) => {
    if(title === 'Email'){
      let email = {
        email: data.currentTextValue,
        category: data.setCurrentSelectValue
      }
      let newEmails = [...emails, email]
      setEmails(newEmails)
    } else {
      let phone = {
        phonenumber: data.currentTextValue,
        category: data.setCurrentSelectValue
      }
      let newPhoneNumbers = [...phonenumbers, phone]
      setPhoneNumbers(newPhoneNumbers)
    }
  }

  const handleSave = () => {
    const contact = {
      first_name,
      last_name,
      phonenumbers: JSON.stringify(phonenumbers),
      emails: JSON.stringify(emails)
    }
    createContact(contact)
  }

  return (
    <div className="d-flex flex-column new-contact">
      <div ref={progressBar} className="hidden">
        <div className="progress">
          <div className="indeterminate"> </div>
        </div>
      </div>
      <div className="header-c-c d-flex justify-content-center align-items-center">
        <div
          style={{ backgroundColor: `#${randomColor}` }}
          className="profile_icon"
        >
          <small>
            <i className="icon-user" />
          </small>
        </div>
      </div>
      <div className="d-flex flex-column form-content">
      <div className="contact-info-add-item d-flex p-3">
      <div className="d-flex flex-grow-1 c-i-a-content">
        <div className="icon-content pl-1 pt-3">
          <i className='icon-user'></i>
        </div>
        <div className="d-flex flex-column c-i-a-input-content">
          <div>
            <Input
              type="text"
              id="first_name"
              className={`txts-inputs`}
              placeholder="First name"
              name="first_name"
              onChange={((e) => {console.log(e.target.value); setFirstName(e.target.value)})}
              required
            />
            <Input
              type="text"
              id="first_name"
              className={`txts-inputs`}
              placeholder="Last name"
              onChange={((e) => {setLastName(e.target.value)})}
              name="first_name"
              required
            />
          </div>
        </div>
      </div>
    </div>
        <ContactInfoAdd 
          icon="icon-phone"
          type="number"
          handleData={handleData}
          data={phonenumbers}
          title="Phone number"
          placeholder="Phone ex:  250 000 0000 000"
        />
        <ContactInfoAdd
          icon="ti-email"
          type="email"
          handleData={handleData}
          data={emails}
          title="Email"
          placeholder="Email ex: jendoe@example.com" />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn-create" onClick={handleSave}>Save Contact</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    createContact,
  },
)(NewContact);