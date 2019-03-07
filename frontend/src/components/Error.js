import React from "react";

const Error = ({errorMessage}) => (
    <div className="error-box">
        <div className="error-box-title">Uh oh, an error occurred</div>
        <div className="error-box-message"> {errorMessage}</div>
    </div>
);

export default Error;
