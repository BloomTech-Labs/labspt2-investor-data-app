import React from "react";

const Team = props => {
  return (
    <div>
      <ul>
        {props.last}, {props.first}
      </ul>
    </div>
  );
};

export default Team;
