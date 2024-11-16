import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";
import { toast } from "react-toastify";

const PeraChallengeContext = createContext(undefined);

export const PeraChallengeProvider = ({ children }) => {
    const [accountAddress, setAccountAddress] = useState();
    const [accounts, setAccounts] = useState();
    const [assets, setAssets] = useState([])
    const isConnectedToPeraWallet = !!accountAddress;
    const developerAddress = "M5XMTPERQYK6DLLT6E4NAVLXCWQQT6DYAI5U5YY4GDLTMZFIASZDNNEGG4";
    const [net, setNet] = useState("testnet")
    const peraWallet = useMemo(() => new PeraWalletConnect({ chainId: 416002 }), []);
    const algod = useMemo(() => new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", 443), []);
    const [publicAPI, setPublicAPI] = useState("https://testnet.api.perawallet.app/v1/public");

    const handleDisconnectWalletClick = useCallback(() => {
      peraWallet.disconnect();
      setAccountAddress(null);
    }, [peraWallet]);

    const getVerifiedAssets = useCallback(async () => {
        try {
            const response = await fetch(`${publicAPI}/verified-assets`, {
                method: 'GET',
                headers: {},
            })
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }
    
            const data = await response.json()
            return data.results
        } catch (error) {
            console.error("Failed to fetch verified assets:", error)
        }
    }, [publicAPI])

    const getVerifiedAssetsDetails = useCallback(async () => {
        try {
            const verifiedAssets = await getVerifiedAssets();
            
            const assetDetails = await Promise.all(
                verifiedAssets.map(async (asset) => {
                    const response = await fetch(`${publicAPI}/assets/${asset.asset_id}`, {
                        method: 'GET',
                        headers: {},
                    })
    
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`)
                    }
    
                    const data = await response.json()
                    return data
                })
            )
    
            setAssets(assetDetails)
        } catch (error) {
            console.error("Error fetching verified asset details:", error)
        }
    }, [getVerifiedAssets, publicAPI])

    useEffect(() => {
        peraWallet.reconnectSession().then((accounts) => {
            peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
            if (accounts.length) {
                setAccountAddress(accounts[0]);
            }
        });
        getVerifiedAssetsDetails()
    }, [peraWallet, handleDisconnectWalletClick, getVerifiedAssetsDetails])

    const handleConnectWalletClick = useCallback(() => {
        peraWallet
            .connect()
            .then((newAccounts) => {
                peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
                setAccounts(newAccounts);
                setAccountAddress(newAccounts[0]);
            })
            .catch((error) => {
                if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                    console.error("Connection error:", error);
                }
            });
    }, [peraWallet, handleDisconnectWalletClick]);

    const handleChangeNet = useCallback(() => {
        if (net === "testnet") {
            peraWallet.chainId = 416001
            setNet("mainnet")
            setPublicAPI("https://mainnet.api.perawallet.app/v1/public")
        } else if (net === "mainnet") {
            peraWallet.chainId = 416002
            setNet("testnet")
            setPublicAPI("https://testnet.api.perawallet.app/v1/public")
        }
        getVerifiedAssetsDetails()
    }, [peraWallet, net, getVerifiedAssetsDetails])

    const donateAlgo = useCallback(async () => {
        if (!accountAddress) {
            toast.error("No account connected");
            return;
        }

        const suggestedParams = await algod.getTransactionParams().do();
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: accountAddress,
            to: developerAddress,
            amount: 1000000,
            suggestedParams,
        });
        
        const singleTxnGroups = [{ txn: txn, signers: [accountAddress] }];
        
        try {
            const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
            const { txId } = await algod.sendRawTransaction(signedTxn).do()
            toast.success("You have successfully donated 1 Algo to the developer of this Dapp!");
        } catch (error) {
            toast.error("Couldn't sign txn");
        }
    }, [accountAddress, algod, peraWallet]);

    const optInAsset = useCallback(async (assetId) => {
        console.log("Asset Id: ", assetId)
        const suggestedParams = await algod.getTransactionParams().do();
        const optInTxn = await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: accountAddress,
            to: accountAddress,
            assetIndex: assetId,
            amount: 0,
            suggestedParams
        });
        const txGroups = [{txn: optInTxn, signers: [accountAddress]}]
        
        try {
            await peraWallet.signTransaction([txGroups]);
            toast.success("You have successfully opted into the Asset")
        } catch (error) {
            console.log("Couldn't sign Opt-in txns",error);
            toast.error("Could not opt into the asset")
        }
    }, [algod, accountAddress, peraWallet])

    const hasOptedIn = useCallback(() => {
        // dddd
    })

    return (
        <PeraChallengeContext.Provider value={{
            accountAddress,
            assets,
            net,
            handleChangeNet,
            isConnectedToPeraWallet,
            handleConnectWalletClick,
            handleDisconnectWalletClick,
            donateAlgo,
            optInAsset,
        }}>
            {children}
        </PeraChallengeContext.Provider>
    );
};

export const usePeraChallengeContext = () => {
    const context = useContext(PeraChallengeContext);
    if (!context) throw new Error("usePeraChallengeContext must be used within a PeraChallengeProvider");
    return context;
};
