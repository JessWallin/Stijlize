import React from 'react';

const InfoPop = props => {
  return (
    // <div className="popupContainer">
    <div className="about">
      <img className="popImage" src={props.url} />
      <h4>{props.title}</h4>
      <p id="popDescription">{props.description}</p>
      <button type="button" onClick={props.close}>
        close
      </button>
    </div>
    // </div>
  );
};

export default InfoPop;
