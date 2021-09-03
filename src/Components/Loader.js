import { useState } from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#EC1971");

  return (
    <div className="sweet-loading">
      <SyncLoader
 color={color} loading={loading} css={override} size={30} />
    </div>
  );
}

export default Loader;
