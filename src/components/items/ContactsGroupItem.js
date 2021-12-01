import React from "react";
import key from "uniqid";
import Item from "./ContactItem";
import { Link } from "react-router-dom";

const MeasurementRangeItem = ({ title, contactList }) => (
  <div className="d-flex flex-column">
    <div className="d-flex align-items-center px-3 py-2">
      <span>{title}</span>
    </div>
    <div className="items-list d-flex flex-column">
      {contactList.map((m) => (
        <Link to={`contacts/${m.id}`}>
          <Item key={key()} contact={m} />
        </Link>
      ))}
    </div>
  </div>
);

export default MeasurementRangeItem;
