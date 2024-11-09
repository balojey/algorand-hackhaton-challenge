import React, { createContext, useState, useContext, ReactNode } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

interface PeraChallengeContextType {
    accountAddress: string | null;
    handleConnectWalletClick: () => void;
    handleDisconnectWalletClick: () => void;
}

const PeraChallengeContext = createContext<PeraChallengeContextType | undefined>(undefined);

interface PeraChallengeProps {
    children: ReactNode;
}

export const PeraChallengeProvider: React.FC<PeraChallengeProps> = ({ children }) => {
    const [accountAddress, setAccountAddress] = useState<string | null>(null);

    const peraWallet = new PeraWalletConnect({
        chainId: 416002
    });

    function handleConnectWalletClick() {
        peraWallet
          .connect()
          .then((newAccounts) => {
            peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);
            setAccountAddress(newAccounts[0]);
          })
          .catch((error: { data: { type: string } }) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
              console.error("Connection error:", error);
            }
          });
    }

    function handleDisconnectWalletClick() {
        peraWallet.disconnect();
        setAccountAddress(null);
     }
    
    return (
        <PeraChallengeContext.Provider value={{
            accountAddress,
            handleConnectWalletClick,
            handleDisconnectWalletClick
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
