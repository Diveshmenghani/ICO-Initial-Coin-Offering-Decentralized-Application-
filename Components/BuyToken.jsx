import React, { useState, useEffect } from "react";

//internal
import Input from "./Input";
import Button from "./Button";


const TokenBuy = ({
  address,
  BuyToken,
  connectWallet,
  setopenBuyToken,
  buyIco,
  Currency,
}) => {
  const [tokenQuentity,settokenQuentity] = useState();
  return (
    <div className="modal">
     <div className="modal-content">
     <span onClick={() => setopenBuyToken(false)} className="close">
           &times;
         </span>
         <h2>Buy Token</h2>
         <div className="input-Container" style={{marginTop:"1rem"}}>
           <Input placeholder={"Quentity"}
           handleChange={(e)=>settokenQuentity(e.target.value)}/>
           <Input placeholder=
           {tokenQuentity ? `${tokenQuentity*Number(buyIco?.price)} ${Currency}` 
           :"OutPut"}
           />
         </div>
         <div className="button-box" style={{ marginTop: "1rem" }}>
           {address ? (
             <Button name="Buy Token" handleClick={() => BuyToken(buyIco?.token,tokenQuentity)}/>
           ) : (
             <Button name="Connect Wallet" handleClick={() => connectWallet()} /> 
           )}
         </div>
     </div>
   </div>
   );
};

export default TokenBuy;
