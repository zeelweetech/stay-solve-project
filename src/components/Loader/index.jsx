import React from "react";
import { Oval } from "react-loader-spinner";

function index({ height, width }) {
  return (
    <div>
      <Oval
        height={height}
        width={width}
        color="#4b4b5e"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#e8e6fa"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  );
}

export default index;
