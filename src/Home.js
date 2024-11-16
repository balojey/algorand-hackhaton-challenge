import NavBar from './components/NavBar'
import WalletAddress from './components/WalletAddress'
import AssetsTableAndDonationButton from './components/AssetsTableAndDonationButton'

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