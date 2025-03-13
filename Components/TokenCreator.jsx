import React, { useState } from "react";
//internal
import UploadLogo from "./UploadLogo";
import Input from "./Input";
import Button from "./Button";

const TokenCreator = ({
  createERC20,
  shortenAddress,
  setopenTokenCreator,
  setloader,
  address,
  connectWallet,
  PINATA_API_KEY,
  PINATA_SECRECT_KEY,
}) => {
  const [imageURL, setimageURL] = useState();
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    supply: "",
  });

  return (
    <div id={"myModal"} className={"modal"}>
      <div className="modal-content">
        <span onClick={() => setopenTokenCreator(false)} className="close">
          &times;
        </span>
        <h2 style={{ marginBottom: "1rem" }}>Create Token</h2>
        <UploadLogo
          imageURL={imageURL}
          setimageURL={setimageURL}
          setloader={setloader}
          PINATA_API_KEY={PINATA_API_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
        />
        <div className="input-container">
          <Input
            placeholder={"Name"}
            handleChange={(e) => setToken({ ...token, name: e.target.value })}
          />
          <Input
            placeholder={"Symbol"}
            handleChange={(e) => setToken({ ...token, symbol: e.target.value })}
          />
          <Input
            placeholder={"Supply"}
            handleChange={(e) => setToken({ ...token, supply: e.target.value })}
          />
        </div>
        <div className="button-box" style={{ marginTop: "1rem" }}>
          {address ? (
            <Button name="Create Token" handleClick={() => createERC20(token,address,imageURL)}/>
          ) : (
            <Button name="Create Token" handleClick={() => connectWallet()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;
