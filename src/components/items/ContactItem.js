import React from "react";


const ContactItem = ({ contact: { first_name, last_name } }) => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);

  return (
    <div className="d-flex p-3 m-item">
      <div className="d-flex flex-grow-1 align-items-center">
        <div style={{backgroundColor: `#${randomColor}`}} className="profile_icon">
          <small>{first_name.substring(0, 1).toUpperCase()}</small>
        </div>  
        <div className="d-flex flex-column mx-3">
          <small className="date">{`${first_name} ${last_name}`}</small>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
