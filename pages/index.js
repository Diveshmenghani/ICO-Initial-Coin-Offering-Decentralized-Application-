import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
//internal import 
import {useStateContext} from "../Context/index";
import Header from "../Components/Header";
import Button from "../Components/Button";
import TokenBuy from "../Components/BuyToken";
import Card from "../Components/Card";
import CreateICO from "../Components/CreateICO";
import Footer from "../Components/Footer";
import ICOMarket from "../Components/ICOMarket";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import Marketplace from "../Components/Marketplace";
import PreSaleList from "../Components/PreSaleList";
import Table from "../Components/Table";
import TokenCreator from "../Components/TokenCreator";
import TokenHistory from "../Components/TokenHistory";
import TokenTransfer from "../Components/TokenTransfer";
import UploadLogo from "../Components/UploadLogo";
import TokenWidthdraw from "../Components/WidthdrawToken";

const index = () => {
  const {
    WidthdrawToken,
    transferTokens,
    BuyToken,
    CreateICOSALE,
    GET_ALL_USER_ICOSALE_TOKEN,
    GET_ALL_ICOSALE_TOKEN,
    createERC20,
    connectWallet,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    ICO_MARKETPLACE_ADDRESS,
    openBuyToken,setopenBuyToken,
    openWidtdraw,setopenWidtdraw,
    openTransferToken,setTopenransferToken,
    openTokenCreator,setopenTokenCreator,
    openCreateICO,setopenCreateICO,
    address,setAddress,
    accountBalance,
    loader,setloader,
    Currency,
    shortenAddress,
    reCall,
  } = useStateContext();
  const notifySuccess = (msg) => toast.success(msg, {duration:2000});
  const notifyError = (msg) => toast.error(msg, {duration:2000});

  const [allICOs,setallICOs] = useState();
  const [allUserIcos,setallUserIcos] = useState();

  const [openallICOs,setopenallICOs] = useState(false);
  const [openTokenHistory,setopenTokenHistory] = useState(false);
  const [openICOMarketplace,setopenICOMarketplace] = useState(false);
  //buy token
  const [buyIco,setbuyIco] = useState();
  const copyAddress = () =>{
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess("Copied successfully");
  };
  useEffect(()=>{
    if(address) {
      GET_ALL_ICOSALE_TOKEN().then((token)=>{
        console.log("All",token);
        setallICOs(token);
      });
      GET_ALL_USER_ICOSALE_TOKEN().then((token)=>{
        console.log("USER",token);
        setallUserIcos(token);
      });
      }
  },[address,reCall]);
  return <div>
    {/*HEADER*/}
    <Header 
    accountBalance={accountBalance}
    setAddress={setAddress}
    address={address}
    connectWallet={connectWallet}
    ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
    shortenAddress={shortenAddress}
    setopenallICOs={setopenallICOs}
    openallICOs={openallICOs}
    setopenTokenCreator={setopenTokenCreator}
    openTokenCreator={openTokenCreator}
    setopenTokenHistory={setopenTokenHistory}
    setopenICOMarketplace={setopenICOMarketplace}
    openICOMarketplace={openICOMarketplace}
    
    />
    <div className="create">
      <h1 style={{fontSize:"2rem"}}>All ICOs MarketPlace</h1>
      {allICOs?.length != 0 && (
        <Marketplace
        array={allICOs}
        shortenAddress={shortenAddress}
        setbuyIco={setbuyIco}
        setopenBuyToken={setopenBuyToken}
        Currency={Currency}
        />
      )}
      <Card 
      setopenallICOs={setopenallICOs}
      setopenTokenCreator={setopenTokenCreator}
      setTopenransferToken={setTopenransferToken}
      setopenTokenHistory={setopenTokenHistory}
      setopenWidtdraw={setopenWidtdraw}
      setopenICOMarketplace={setopenICOMarketplace}
      copyAddress={copyAddress}
      setopenCreateICO={setopenCreateICO}
      />
     </div>
 { openallICOs && 
  ( <ICOMarket 
   array={allUserIcos}
   shortenAddress={shortenAddress}
   handleClick={setopenallICOs}
   Currency={Currency}/>
   )}
  {openTokenCreator && (
  <TokenCreator
  createERC20={createERC20}
  shortenAddress={shortenAddress}
  setopenTokenCreator={setopenTokenCreator}
  setloader={setloader}
  address={address}
  connectWallet={connectWallet}
  PINATA_API_KEY={PINATA_API_KEY}
  PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
  />
  )}
  {openTokenHistory && (
    <TokenHistory 
   shortenAddress={shortenAddress} 
   setopenTokenHistory={setopenTokenHistory}
  />
  )}
  {openCreateICO  && ( 
  <CreateICO
  shortenAddress={shortenAddress}
  setopenCreateICO={setopenCreateICO}
  connectWallet={connectWallet}
  address={address}
  CreateICOSALE={CreateICOSALE}
  />
  )}
  {openICOMarketplace && 
  ( <ICOMarket 
   array={allICOs}
   shortenAddress={shortenAddress}
   handleClick={setopenICOMarketplace}
   Currency={Currency}/>
   )}
   {openBuyToken && (
    <TokenBuy
    address={address}
    BuyToken={BuyToken}
    connectWallet={connectWallet}
    setopenBuyToken={setopenBuyToken}
    buyIco={buyIco}
    Currency={Currency}
    />)}
  {openTransferToken && (
    <TokenTransfer
    address={address}
    transferTokens={transferTokens}
    connectWallet={connectWallet}
    setTopenransferToken={setTopenransferToken}
    />)}
  {openWidtdraw && (
  <TokenWidthdraw
  address={address}
  WidthdrawToken={WidthdrawToken}
  connectWallet={connectWallet}
  setopenWidtdraw={setopenWidtdraw} 
  />)} 
    <Footer/>
    {loader && <Loader/>}
  </div>;
};

export default index;
