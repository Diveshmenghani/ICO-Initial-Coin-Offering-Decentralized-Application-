import React from "react";
import toast from "react-hot-toast";
const ICOMarket = ({
  array,
  shortenAddress,
  handleClick,
  Currency,}) => {
  const notifySuccess = (msg) => toast.success(msg, {duration:2000});
  const notifyError = (msg) => toast.error(msg, {duration:2000});
  const copyAddress = (text) =>{
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => handleClick(false)} className="close">
          &times;
        </span>
        <h2>All ICO You have created</h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Supply</th>
                <th>Token</th>
                <th>Creator</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {array?.map((token, index) => (
                <tr key={index}>
                  <td>{token?.name}</td>
                  <td>{token?.symbol}</td>
                  <td>{token?.icoSaleBal}</td>
                  <td onClick={() => copyAddress(token?.token)}>
                    {shortenAddress(token?.token)}📋 
                  </td>
                  <td onClick={() => copyAddress(token?.creator)}>
                    {shortenAddress(token?.creator)}📋 
                  </td>
                  <td>{token?.price} {Currency}</td>  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ICOMarket;
