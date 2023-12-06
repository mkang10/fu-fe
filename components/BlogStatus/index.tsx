import React from "react";
interface StatusProps {
  status: number | undefined;
}
function BlogStatus({ status }: StatusProps) {
  let textColor = "";
  let backgroundColor = "";
  if (status === 1) {
    textColor = "#03543F";
    backgroundColor = "#DEF7EC";
  } else if (status === 0) {
    textColor = "#723B13";
    backgroundColor = "#FDF6B2";
  } else if (status === 2) {
    textColor = "#9B1C1C";
    backgroundColor = "#FDE8E8";
  }

  const divStyle = {
    color: textColor,
    backgroundColor: backgroundColor,
    fontSize: "14px",
    lineHeight: "21px",
    borderRadius: "8px",
    padding: "10px",
  };

  return (
    <div style={divStyle}>
      {status === 0
        ? "Pending"
        : status === 1
        ? "Approved"
        : status === 2
        ? "Expired"
        : ""}
    </div>
  );
}

export default BlogStatus;
