import React from "react";
import Checker from "./Checker";

export default function Board() {
  return (
    <div
      style={{
        position: "relative",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="../src/assets/Images/board.png" alt="" width={"80%"} />
      <Checker />
    </div>
  );
}
