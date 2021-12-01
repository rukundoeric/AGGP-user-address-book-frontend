import React from 'react';

export default function input({
  type,
  id,
  placeholder,
  name,
  onChange
}) {
  return (
    <div className="d-flex">
      <div className="input-group d-flex">
        <input
          type={type}
          id={id}
          className={`txts-inputs`}
          placeholder={placeholder}
          aria-describedby="inputGroupPrepend2"
          name={name}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
