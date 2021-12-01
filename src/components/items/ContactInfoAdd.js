import React, { useState } from "react";
import Input from "../commons/input";

export default function ContactInfoAdd({
  icon,
  placeholder,
  type,
  title,
  handleData,
  data,
}) {
  const [currentTextValue, setCurrentTextValue] = useState("");

  let handleCurrentTextValue = (e) => {
    let value = e.target.value;
    setCurrentTextValue(value);
  };

  return (
    <div className="contact-info-add-item d-flex p-3">
      <div className="d-flex flex-grow-1 c-i-a-content">
        <div className="icon-content pl-1 pt-3">
          <i className={icon}></i>
        </div>
        <div className="d-flex flex-column c-i-a-input-content">
          {data.map(({ phonenumber, category, email }) => (
            <div className="cphone">
              <div>
                <span>{title === "Email" ? email : phonenumber}</span>
              </div>
              <div>
                <small>{category}</small>
              </div>
            </div>
          ))}
          <div>
            <Input
              type={type}
              className={`txts-inputs`}
              placeholder={placeholder}
              value={currentTextValue}
              onChange={handleCurrentTextValue}
              required
            />
            <select
              class="txts-select"
              aria-label="Default select example"
              onChange={(e) => {
                handleData(
                  {
                    currentTextValue,
                    setCurrentSelectValue: e.target.value,
                  },
                  title
                );
              }}
            >
              <option>Category</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
