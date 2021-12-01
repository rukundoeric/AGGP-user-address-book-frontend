import React, { useEffect, useRef, useState } from "react";
import { getSingleContact, deleteContact } from "../../redux/actions/Contacts";
import { connect, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const ContactDetails = ({
  contacts: { cDetails, ccResponse },
  match: {
    params: { id },
  },
  getSingleContact,
  deleteContact,
  history: { push },
}) => {
  const [contactDetails, setContactDetails] = useState(undefined);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const dispatch = useDispatch();
  useEffect(() => {
    getSingleContact(id);
  }, []);
  useEffect(() => {
    setContactDetails(cDetails);
  }, [cDetails]);
  useEffect(() => {
    switch (ccResponse.status) {
      case 'success':
        toast.success('Contact Deleted successfully');
        // dispatch({ type: 'C_M_RESET' });
        push('/contacts');
        break;
      default:
    }
  }, [ccResponse.status]);

  const handleDeleteContact = () => {
    deleteContact(id);
  }
  return (
    <div className="contact-details d-flex flex-column">
      {!cDetails && (
        <div>
          <div className="progress">
            <div className="indeterminate"> </div>
          </div>
        </div>
      )}

      {cDetails && (
        <div>
          <div className="header-c-c-d d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div
                style={{ backgroundColor: `#${randomColor}` }}
                className="profile_icon"
              >
                <small>
                  <i className="icon-user" />
                </small>
              </div>
              <div>
                <h5 className="mt-3">{`${cDetails.contact.first_name} ${cDetails.contact.last_name}`}</h5>
              </div>
            </div>
          </div>
          <div className="d-flex flex-grow-1 c-i-a-content p-4">
            <div className="icon-content pl-1 pt-3">
              <i className="icon-phone"></i>
            </div>
            <div className="d-flex flex-column c-i-a-input-content">
              { JSON.parse(cDetails.contact.phonenumbers).map(({ phonenumber, category }) => (
                <div className="cphone">
                  <div>
                    <span>{phonenumber}</span>
                  </div>
                  <div>
                    <small>{category}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex flex-grow-1 c-i-a-content p-4">
            <div className="icon-content pl-1 pt-3">
              <i className="ti-email"></i>
            </div>
            <div className="d-flex flex-column c-i-a-input-content">
              { JSON.parse(cDetails.contact.emails).map(({ email, category }) => (
                <div className="cphone">
                  <div>
                    <span>{email}</span>
                  </div>
                  <div>
                    <small>{category}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn-delete" onClick={handleDeleteContact}>Delete</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  getSingleContact,
  deleteContact
})(ContactDetails);
