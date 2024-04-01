import React from "react";

export default function Square({ choosSquare, value }) {
  return (
    <div className="square" onClick={choosSquare}>
      {value}
    </div>
  );
}
