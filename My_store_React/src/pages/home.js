import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { TbReceiptOff } from 'react-icons/tb';
import { FaHeadphones } from 'react-icons/fa';
import Category from '../comp/category';
import '../Css/home.css'
import Home_product from '../comp/top_product';

function Home() {
    return (
    <>
    <div className='top_banner'>
        <div className='container'>
            <div className='detail'>
                <h2>The best products related to the world of bees</h2>
                <Link to='/product' className='link'>Shop Now <BsArrowRight/></Link>
            </div>
            <div className='img_box'>
                <img src='./img/as.png' width="450px" height="450px"/>
            </div>
        </div>
    </div>
    <div className='about'>
        <div className='container'>
            <div className='box'>
                <div className='icon'>
                    <FiTruck/>
                </div>
                <div className='detail'>
                    <h3>Free Shopping</h3>
                    <p>Order above $1000</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
                    <BsCurrencyDollar/>
                </div>
                <div className='detail'>
                    <h3>Return & Refund</h3>
                    <p>Mony Back Gaurenty</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
                    <TbReceiptOff/>
                </div>
                <div className='detail'>
                    <h3>Member Discount</h3>
                    <p>On every Order</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
                    <FaHeadphones/>
                </div>
                <div className='detail'>
                    <h3>Customer Support</h3>
                    <p>Every Time Call Support</p>
                </div>
            </div>
        </div>
    </div>

    <Category/>
    <Home_product/>
    <div className='banner'>
        <div className='container'>
            <div className='detail'>
            <h4>The best types</h4>
            <h3>Yemeni Sidr honey</h3>
            <p>$ 60</p>
            <Link to='/product' className='link'>Shop Now  <BsArrowRight/></Link>
        </div>
        <div className='img_box'>
            <img src='http://www.aslnhl.com/assets/images/resource/honey-1.png' alt='sss' width="500px" height="500px"></img>
        </div>
        </div>
    </div>
    
    </>
    )
}
export default Home