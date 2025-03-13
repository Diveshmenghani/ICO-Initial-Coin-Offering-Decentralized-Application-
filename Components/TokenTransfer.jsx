import React, { useState, useEffect } from "react";

//internal
import Input from "./Input";
import Button from "./Button";

const TokenTransfer = ({
    address,
    transferTokens,
    connectWallet,
    setTopenransferToken,
}) => {
    const [transferTokenData,settransferTokenData] = useState({
        address:"",
        tokenAdd:"",
        amount:"",
    });
    return (
        <div className="modal">
         <div className="modal-content">
         <span onClick={() => setTopenransferToken(false)} className="close">
               &times;
             </span>
             <h2>Transfer Token</h2>
             <div className="input-Container" style={{marginTop:"1rem"}}>
               <Input placeholder={"Address"}
               handleChange={(e)=>settransferTokenData({...transferTokenData,address:e.target.value})}/>
               <Input placeholder={"tokenAdd"}
               handleChange={(e)=>settransferTokenData({...transferTokenData,tokenAdd:e.target.value})}/>
               <Input placeholder={"amount"}
               handleChange={(e)=>settransferTokenData({...transferTokenData,amount:e.target.value})}/>
             </div>
             <div className="button-box" style={{ marginTop: "1rem" }}>
               {address ? (
                 <Button name="Token Transfer" handleClick={() => transferTokens(transferTokenData)}/>
               ) : (
                 <Button name="Connect Wallet" handleClick={() => connectWallet()} /> 
               )}
             </div>
         </div>
       </div>
     
        );
};

export default TokenTransfer;

