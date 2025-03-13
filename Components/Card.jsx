import React from "react";

const Card = (
 {    setopenallICOs,
      setopenTokenCreator,
      setopenTokenHistory,
      setopenWidtdraw,
      setopenICOMarketplace,
      copyAddress,
      setopenCreateICO,
      setTopenransferToken,
}) => {
  const features = [
    {
      title: "ICO ADDRESS",
      description:
        "Get Detail of ICO Contract and cpoy the ico contract address to transfer the token to ICO Contract",
      btnName: "Copy Address",
    },
    {
      title: "Create ICO",
      description:
        "Get Detail of ICO Contract and cpoy the ico contract address to transfer the token to ICO Contract",
      btnName: "Create ICO",
    },
    {
      title: "Your Created ICO",
      description:
        "Get All Your Created ICO is an innovative platform designed for managing and tracking your own Initial Coin Offerings (ICOs)",
      btnName: "Get All Created ICO",
    },
    {
      title: "ICO Marketplace",
      description:
        "Get All Created ICO is a comprehensive platform providing detailed information on Initial Coin Offerings (ICOs) worldwide",
      btnName: "Listed ICOs",
    },
    {
      title: "Create Token",
      description:
        "Creating a token involves defining it on a blockchain platform, such as Ethereum, Binance Smart Chain, or others that support smart contracts",
      btnName: "Create Token",
    },
    {
      title: "History",
      description:
        "To create a token that logs the history of token creation by a single user, we can extend the ERC-20 contract with additional functionality to record each instance a user mints new tokens",
      btnName: "Get Token History",
    },
    {
      title: "Transfer Token",
      description:
        "To enable the transfer of tokens between users within your smart contract, you'll need to implement functions that allow token holders to send tokens to others",
      btnName: "Transfer Token",
    },
    {
      title: "Widthdraw Token",
      description:
        "To enable the transfer of tokens between users within your smart contract, you'll need to implement functions that allow token holders to send tokens to others",
      btnName: "Widthdraw Token",
    },
  ];
  
  return ( 
  <>
  <div className="wrapper">
    {
     features.map((features,index)=>(
      <div key={index} className="card">
        <p className="card-content" style={{ marginTop:"1rem"}}>
          {features.description}
        </p>
        <button className="card-btn"  style={{ marginTop:"1rem"}}
        onClick={()=>
           features.title == "Create ICO" ? setopenCreateICO(true):
           features.title == "Your Created ICO" ? setopenallICOs(true) :
           features.title == "ICO Marketplace" ? setopenICOMarketplace(true):
           features.title == "Create Token" ? setopenTokenCreator(true):
           features.title == "History" ? setopenTokenHistory(true):
           features.title == "Transfer Token" ? setTopenransferToken(true):
           features.title == "Widthdraw Token" ? setopenWidtdraw(true):
           features.title == "ICO ADDRESS" ? copyAddress():
           ""
          }>
          {features.btnName}
        </button>
        </div>
        ))} 
    </div>
  </>
  );
};

export default Card;
