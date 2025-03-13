import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const TokenHistory = (
  { shortenAddress ,
   setopenTokenHistory,}
) => {
  const notifySuccess = (msg) => toast.success(msg, {duration:2000});
  const notifyError = (msg) => toast.error(msg, {duration:2000});

  const copyAdress =(text) =>{
    navigator.clipboard.writeText(text);
    notifySuccess("copied Successfully");
  }
  const [history, sethistory] = useState(null);
  const [imageURL, setimageURL] = useState();
  useEffect(()=>{
    const storedData = localStorage.getItem("TOKEN_HISTORY");
    if(storedData){
      sethistory(JSON.parse(storedData));
      console.log(JSON.parse(storedData));
    }
  },[]);
  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setopenTokenHistory(false)} className="close">
          &times;
        </span>
        <h2>Token History</h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Supply</th>
                <th>Address</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {history?.map((token, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={token?.logo || "theblockchaincoders.jpg"}
                      alt=""
                      style={{
                        width: "30px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </td>
                  <td>{token?.name}</td>
                  <td>{token?.symbol}</td>
                  <td>{token?.supply}</td>
                  <td onClick={() => copyAdress(token?.address)}>
                    {shortenAddress(token?.address)}📋 
                  </td>
                  <td onClick={() => copyAdress(token?.transactionHash)}>
                    {shortenAddress(token?.transactionHash)}📋 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenHistory;

