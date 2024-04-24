import React from 'react';

function ResultComponent({ status }) {

  let value;
  let color;

  if (status === 'Accepted') {
    value = 'Accepted';
    color = 'green';
  } else{
    value = status;
    color = 'red';
  }

  return (
    <div>
      <span style={{ color, fontSize: '20px', fontStyle: 'arial'}}>{value}</span>
    </div>
  );
}

export default ResultComponent