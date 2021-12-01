import React from 'react';

export default function image({
  src, defaultSrc, name, classes, alt,
}) {
  const addDefaultSrc = e => {
    e.target.src = defaultSrc;
  };
  return (
    <div>
      {src ? (
        <img onError={addDefaultSrc} className={classes} src={src} alt={alt} />
      ) : (
        <div className={classes}>{name.charAt(0)}</div>
      )}
    </div>
  );
}
