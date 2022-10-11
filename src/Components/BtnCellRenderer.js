import React from 'react';

export default (props) => {
  const handleRemove = (value) =>{
    props.handleDelete(props.data.id);
  }
  return (
    <span>
      
      <button onClick={handleRemove}>Push</button>
    </span>
  );
};

