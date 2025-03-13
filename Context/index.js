import React,{useState,useContext, createContext,useEffect,children} from "react";
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

//internal import 
import{
    ERC20Generator,
    ERC20Generator_BYTECODE,
    handleNetworkSwitch,
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    ICO_MARKETPLACE_CONTRACT,
    Token_Contract,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    ERC20Generator_ABI,

} from "./constants";

const  StateContext = createContext();

export const StateContextProvider =({children}) =>{
    //State Veriable
    const [address,setAddress] = useState();
    const [accountBalance,setaccountBalance] = useState(null);
    const [loader,setloader] = useState(false);
    const [reCall,setreCall] = useState(0);
    const [Currency,setCurrency] = useState("ETH");

    //COMPONENT
    const [openBuyToken,setopenBuyToken] = useState(false);
    const [openWidtdraw,setopenWidtdraw] = useState(false);
    const [openTransferToken,setTopenransferToken] = useState(false);
    const [openTokenCreator,setopenTokenCreator] = useState(false);
    const [openCreateICO,setopenCreateICO] = useState(false);

    const notifySuccess = (msg) => toast.success(msg, {duration:2000});
    const notifyError = (msg) => toast.error(msg, {duration:2000});

    //function
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) throw notifyError("No account found");
            // await handleNetworkSwitch();
            const accounts = await window.ethereum.request({
               method: "eth_accounts", 
            });
            
            if(accounts.length){
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const getbalance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(getbalance);
                setaccountBalance(bal);
                return accounts[0];
            
            }
            else {
                notifyError("Noo account found");
            }
        } catch (error) {
            console.log(error);
            notifyError("Noo account found");
        }
    };
    useEffect(()=>{
        checkIfWalletConnected();
    },[address]);

    const connectWallet= async () => {
        try {
            if (!window.ethereum) throw notifyError("No account found");
            // await handleNetworkSwitch();
            const accounts = await window.ethereum.request({
               method: "eth_requestAccounts", 
            });
            
            
            if(accounts.length){
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const getbalance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(getbalance);
                setaccountBalance(bal);
                return accounts[0];
            }
            else {
                notifyError("Noo account found");
            }
        } catch (error) {
            console.log(error);
            notifyError("Noo account found");
        }
    };
    //maine function
    const _deployContract = async (signer, account, name, symbol, supply, imageURL) => {
        try {
          const factory = new ethers.ContractFactory(ERC20Generator_ABI, ERC20Generator_BYTECODE, signer);
          const totalSupply = Number(supply);
          const _initialSupply = ethers.utils.parseEther(totalSupply.toString(), "ether");
      
          let contract = await factory.deploy(_initialSupply, name, symbol);
          await contract.deployed();
          console.log("Contract deployed at address:", contract.address);
      
          if (contract.address) {
            const today = Date.now();
            let date = new Date(today);
            const _tokenCreatedDate = date.toLocaleDateString("en-US");
      
            const _token = {
              account: account,
              name: name,
              symbol: symbol,
              supply: supply,
              address: contract.address,
              transactionHash: contract.deployTransaction.hash,
              createdAt: _tokenCreatedDate,
              logo: imageURL,
            };
            console.log("Token data:", _token);

            let tokenHistory = [];
            const history = localStorage.getItem("TOKEN_HISTORY");     
            if (history) {
              tokenHistory = JSON.parse(history);
            }
            tokenHistory.push(_token);
            localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
            setloader(false);
            setreCall((prev) => prev + 1);
            setopenTokenCreator(false);
          }
        } catch (error) {
          setloader(false);
          notifyError("Something went wrong. Please try again later.");
          console.error(error);
        }
      };
      
    const createERC20 = async (token, account,imageURL) => {
        const {name,symbol,supply} = token;
        try {
            setloader(true);
            notifySuccess("Creating token....");
            if(!name||!symbol||!supply){
                notifyError("Data Missing");
            }
            else{
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                _deployContract(signer,account,name,symbol,supply,imageURL);
            }
            
        } catch (error) {
            setloader(false);
            notifyError("SomeThing Went Wrong Try later");
            console.log(error);

        }
    };
    const GET_ALL_ICOSALE_TOKEN = async (token, account , imageURL) => {
        try {
            setloader(true);
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACT();

            if(address){
                const allICOSaleToken = await contract.getAllTokens();

                const _tokenArray = Promise.all(
                    allICOSaleToken.map (async (token) =>{
                        const tokenContract = await Token_Contract(token?.token);

                        const balance = await tokenContract.balanceOf(
                            ICO_MARKETPLACE_ADDRESS
                        );
                        return {
                            creator : token.creator,
                            token: token.token,
                            name: token.name,
                            symbol: token.symbol,
                            supported: token.supported,
                            price: ethers.utils.formatEther(token?.price.toString()),
                            icoSaleBal: ethers.utils.formatEther(balance.toString()),
                        };
                    })
                );
                setloader(false);
                return _tokenArray; 
            }    
        } catch (error) {
            console.log(error);
            notifyError("SomeThing Went Wrong Try later");
        }
    };
    const GET_ALL_USER_ICOSALE_TOKEN = async () => {
        try {
            setloader(true);
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACT();

            if(address){
                const allICOSaleToken = await contract.getTokenCreatedBy(address);

                const _tokenArray = Promise.all(
                    allICOSaleToken.map (async (token) =>{
                        const tokenContract = await Token_Contract(token?.token);

                        const balance = await tokenContract.balanceOf(
                            ICO_MARKETPLACE_ADDRESS
                        );
                        return {
                            creator : token.creator,
                            token: token.token,
                            name: token.name,
                            symbol: token.symbol,
                            supported: token.supported,
                            price: ethers.utils.formatEther(token?.price.toString()),
                            icoSaleBal: ethers.utils.formatEther(balance.toString()),
                        };
                    })
                );
                setloader(false);
                return _tokenArray; 
            }    
        } catch (error) {
            console.log(error);
            notifyError("SomeThing Went Wrong Try later");
        }
    };
    const CreateICOSALE = async (icoSale) => {
        try {
          const { address, price } = icoSale;
          console.log(icoSale);
          if (!address || !price) return notifyError("Data missing");
      
          setloader(true);
          notifySuccess("Creating IcoSale...");
          await connectWallet();
      
          const contract = await ICO_MARKETPLACE_CONTRACT();
      
          // Check if the contract is defined
          if (!contract) {
            setloader(false);
            notifyError("Failed to load the contract");
            return;
          }
      
          const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
      
          const transaction = await contract.createICO(address, payAmount, {
            gasLimit: ethers.utils.hexlify(8000000),
          });
      
          await transaction.wait();
          if (transaction.hash) {
            setloader(false);
            setopenCreateICO(false);
            setreCall(reCall + 1);
          }
        } catch (error) {
          setloader(false);
          notifyError("Something went wrong, try again later");
          console.error(error);
        }
      };
      
    const BuyToken = async (token,tokenQuantity) => {
           
        try {
            setloader(false);
            notifySuccess("Purchasing token....");
            // console.log("buyIco:", buyIco);
            console.log("Token Address:", token);
            if (!tokenQuantity || !token) return notifyError("Data Missing");
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACT();

            const _tokenBal = await contract.getBalance(token);
            const _tokenDetails = await contract.getTokenDetails(token);
            console.log("Token Details:", _tokenDetails);
            const avalableToken = ethers.utils.formatEther(_tokenBal.toString());
            console.log("Avalable Token:", avalableToken);
            if (avalableToken>0){
                const price = ethers.utils.formatEther(_tokenDetails.price.toString()) * Number(tokenQuantity);
                const payAmount = ethers.utils.parseUnits(price.toString(),"ether");

                const transection = await contract.buyToken(token,Number(tokenQuantity),
                {
                  value : payAmount.toString(),
                  gasLimit: ethers.utils.hexlify(8000000), 
                }
            );
            await transection.wait();
                
                setloader(false);
                setreCall(reCall + 1);
                setopenBuyToken(false);
                notifySuccess("Transection completed successfully");
                } else {
                    setloader(false);
                    setopenBuyToken(false);
                    notifyError("Your token Blance is 0")
                }
        } catch (error) {
            setloader(false);
            setopenBuyToken(false);
            notifyError("SomeThing Went Wrong Try later");
            console.log(error);
        }
    };
    const transferTokens = async (transferTokenData) => {
        try {
            if(!transferTokenData.address || !transferTokenData.amount || !transferTokenData.tokenAdd)
                return notifyError("Data is Missing");
            setloader(false);
            notifySuccess("transection is proccessing..");
            const address = await connectWallet();
            const contract = await Token_Contract(transferTokenData.tokenAdd);
            const _avalibalBal = await contract.balanceOf(address);
            const avalableToken = ethers.utils.formatEther(_avalibalBal.toString());
            
            if (avalableToken>1){
                const payAmount = ethers.utils.parseUnits(transferTokenData.amount.toString(),"ether");
                const transection = await contract.transfer(
                    transferTokenData.address,
                    payAmount,
                    {
                        gasLimit: ethers.utils.hexlify(8000000),
                    }
                );
                await transection.wait();
                setloader(false);
                setreCall(reCall + 1);
                setTopenransferToken(false);
                notifySuccess("Transection completed successfully");
            }
            else{
                setloader(false);
                setreCall(reCall + 1);
                setTopenransferToken(false);
                notifyError("Your Balance is 0");
            }
        } catch (error) {
            setloader(false);
            setreCall(reCall + 1);
            setTopenransferToken(false);
            notifyError("Something Went Wrong");
            console.log(error); 
        }
    };
    const WidthdrawToken = async (WidthdrawQuantity) => {
        try {
            if(!WidthdrawQuantity.amount || !WidthdrawQuantity.token)
                return notifyError("Data is Missing");
            setloader(false);
            notifySuccess("transection is proccessing..");
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACT();
            const payAmount = ethers.utils.parseUnits(WidthdrawQuantity.amount.toString(),"ether");
            const transection = await contract.withdraw(
                WidthdrawQuantity.token,
                payAmount,
            {
                gasLimit: ethers.utils.hexlify(8000000),
            });
            await transection.wait();
                setloader(false);
                setreCall(reCall + 1);
                setopenWidtdraw(false);
                notifySuccess("Transection completed successfully");
        } 
        catch (error) {
            setloader(false);
            setreCall(reCall + 1);
            setopenWidtdraw(false);
            notifyError("Something Went Wrong");
            console.log(error); 
        }
    };


    return (<StateContext.Provider value={{
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
    }}>{children}</StateContext.Provider>
);
};
export const useStateContext = () => useContext(StateContext);
