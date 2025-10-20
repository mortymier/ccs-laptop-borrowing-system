import '../styles/Home.css';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import laptop_hero from '../images/laptop_hero.jpg';
import borrow_process from '../images/borrow_process.png';


export default function Home()
{
    return (
        <>
            <Header/>
            <main className="home">
                <img src={laptop_hero} alt="A woman handing over a laptop to someone"/>
                <div className="get-started">
                    <h3> WE GOT YOU COVERED! </h3>
                    <p>
                        Need a laptop for your next task? <br/>
                        We can help you get one from the CCS Office. <br/>
                        Create an account now and start borrowing!
                    </p>
                    <a href="/login"> Start Borrowing </a>
                </div>
                <div className="borrow-process">
                    <h3> BORROWING PROCESS </h3>
                    <img src={borrow_process} alt="Laptop borrow process"/>
                </div>
            </main>
            <Footer/>
        </>
    )
}