import React, { useState, useEffect } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
const Marketplace = ({
        array,
        shortenAddress,
        setbuyIco,
        setopenBuyToken,
        Currency,
}) => {
  const notifySuccess = (msg) => toast.success(msg, {duration:2000});
  const notifyError = (msg) => toast.error(msg, {duration:2000});

  const copyAdress =(text) =>{
    navigator.clipboard.writeText(text);
    notifySuccess("copied Successfully");
  }
  return <div className="table-container">
  <table className="custom-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Supply</th>
        <th>Token</th>
        <th>Creator</th>
        <th>Price</th>
        <th>Buy</th>
      </tr>
    </thead>
    <tbody>
      {array?.map((token, index) => (
        <tr key={index}>
          <td>{token?.name}</td>
          <td>{token?.symbol}</td>
          <td>{token?.icoSaleBal}</td>
          <td onClick={() => copyAdress(token?.token)}>
            {shortenAddress(token?.token)}📋 
          </td>
          <td onClick={() => copyAdress(token?.creator)}>
            {shortenAddress(token?.creator)}📋 
          </td>
          <td>{token?.price} {Currency}</td>
          <td onClick={() => {
            setbuyIco(token);
            setopenBuyToken(true);
            }}>
          <Button name={"Buy"} />
           </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
};

export default Marketplace;
