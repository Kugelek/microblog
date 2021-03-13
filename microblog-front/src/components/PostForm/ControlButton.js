import React from 'react';

const ControlButton = props => {
    const classes = props.active ? 'customEditor__button--active customEditor__button' : 'customEditor__button';
    return( 
        <span className={classes} onMouseDown={(e) => {
            e.preventDefault();
            props.onToggle(props.style);
        }}>
          {props.icon}
        </span>
     
    );
  }
 
export default ControlButton;