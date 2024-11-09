export default function NavBar() {
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
                    <a className="button is-primary">
                        <strong>Connect Pera Wallet</strong>
                    </a>
                </div>
            </div>
            </div>
        </nav>
    )
}