import { useEffect, useState } from "react"
import { usePeraChallengeContext } from "../context/PeraChallengeContext"

export default function WalletAddress() {
    const { isConnectedToPeraWallet, accountAddress } = usePeraChallengeContext()

    return (
        <div className="notification mx-6 mt-3">
            <p className="subtitle is-5">Connected Wallet Address: <strong>{isConnectedToPeraWallet ? accountAddress : "Please connect your pera wallet"}</strong></p>
        </div>
    )
}