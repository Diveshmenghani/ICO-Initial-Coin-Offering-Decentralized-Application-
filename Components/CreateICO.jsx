import React, { useState, useEffect } from "react";

//internal
import Input from "./Input";
import Button from "./Button";

const CreateICO = ({
  shortenAddress,
  setopenCreateICO,
  connectWallet,
  address,
  CreateICOSALE,
}) => {

  const[icoSale,seticoSale] = useState({
    address:"",
    price:"",
  });
  return (
   <div className="modal">
    <div className="modal-content">
    <span onClick={() => setopenCreateICO(false)} className="close">
          &times;
        </span>
        <h2>Create ICO</h2>
        <div className="input-Container" style={{marginTop:"1rem"}}>
          <Input placeholder={"Address"}
          handleChange={(e)=>seticoSale({...icoSale,address:e.target.value})}/>
          <Input placeholder={"price"}
          handleChange={(e)=>seticoSale({...icoSale,price:e.target.value})}/>
        </div>
        <div className="button-box" style={{ marginTop: "1rem" }}>
          {address ? (
            <Button name="Create ICO" handleClick={() => CreateICOSALE(icoSale)}/>
          ) : (
            <Button name="Connect Wallet" handleClick={() => connectWallet()} />
          )}
        </div>
    </div>
  </div>

   );
};

export default CreateICO;
