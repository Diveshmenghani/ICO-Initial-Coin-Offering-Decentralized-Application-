import React, { useState, useEffect } from "react";

//internal
import Input from "./Input";
import Button from "./Button";

const TokenWidthdraw = ({ 
  address,
  WidthdrawToken,
  connectWallet,
  setopenWidtdraw, 
}) => {
  const [WidthdrawQuantity,setWidthdrawQuantity] = useState({
    token:"",
    amount:"",
  });
  
  return (
    <div className="modal">
     <div className="modal-content">
     <span onClick={() => setopenWidtdraw(false)} className="close">
           &times;
         </span>
         <h2>Widthdraw Token</h2>
         <div className="input-Container" style={{marginTop:"1rem"}}>
           <Input placeholder={"token"}
           handleChange={(e)=>setWidthdrawQuantity({...WidthdrawQuantity,token:e.target.value})}/>
           <Input placeholder={"amount"}
           handleChange={(e)=>setWidthdrawQuantity({...WidthdrawQuantity,amount:e.target.value})}/>
         </div>
         <div className="button-box" style={{ marginTop: "1rem" }}>
           {address ? (
             <Button name="Widthdraw Token" handleClick={() => WidthdrawToken(WidthdrawQuantity)}/>
           ) : (
             <Button name="Connect Wallet" handleClick={() => connectWallet()} /> 
           )}
         </div>
     </div>
   </div>
 
    );
};

export default TokenWidthdraw;
