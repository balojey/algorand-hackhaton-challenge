import { usePeraChallengeContext } from "../context/PeraChallengeContext"

export default function NavBar() {
    const {
        net,
        handleChangeNet,
        isMultipleAccount,
        isConnectedToPeraWallet,
        accounts,
        handleConnectWalletClick,
        handleDisconnectWalletClick
    } = usePeraChallengeContext()

    return (
        <nav className="navbar my-2" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
            <a className="navbar-item" href="#">
                <h1 className="title is-3">PeraChallenge</h1>
            </a>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <button className={net === "testnet" ? `button is-rounded` : `button is-success is-rounded`} onClick={handleChangeNet}>{net.toUpperCase()}</button>
                        <button data-target="modal-js-example" className={isConnectedToPeraWallet ? `button is-danger js-modal-trigger` : `button is-primary js-modal-trigger`} onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}>
                            <strong>{isConnectedToPeraWallet ? "Disconnect" : "Connect Pera Wallet"}</strong>
                        </button>
                        {/* <button id="dhur" className="button" onClick={() => {
                            document.getElementById("dhur").classList.add("is-active")
                        }}>balo</button> */}
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                <p className="image is-4by3">
                    <img src="https://bulma.io/assets/images/placeholders/1280x960.png" alt="" />
                </p>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </nav>
    ) 
}