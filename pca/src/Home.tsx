import NavBar from './components/NavBar.tsx'
import WalletAddress from './components/WalletAddress.tsx'
import AssetsTableAndDonationButton from './components/AssetsTableAndDonationButton.tsx'

const Home = () => {

    return (
        <div className='main mx-3'>
            <NavBar />
            <WalletAddress />
            <AssetsTableAndDonationButton />
        </div>
    )
}

export default Home;