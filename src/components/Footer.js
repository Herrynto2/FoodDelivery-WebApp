import React from 'react';
import { Link } from 'react-router-dom'
import Instagram from '../img/ig.png'
import Youtube from '../img/youtube.png'
import Facebook from '../img/fb.png'
import Android from '../img/playstore.png'
import Mac from '../img/playstore2.png'

class Footer extends React.Component {
    render() {
        return (
            <div >
                <div className="container" >
                    <div className="row mt-5" >
                        <div className="col-sm-3 mb-5" >
                            <h4 className="bold" > Axelcious
            </h4>
                            <div className="mt-3" > < Link to="/login" className="textfooter" > Contact us </Link></div >
                            <div className="mt-2" > < Link to="/login" className="textfooter" > About us </Link></div >
                            <div className="mt-2" > < Link to="/login" className="textfooter" > See items </Link></div >
                            <div className="mt-2" > < Link to="/login" className="textfooter" > See Restaurant </Link></div >
                        </div>
                        <div className="col-sm-4" >
                            <h4 className="bold mb-3" > Call us </h4> <a href="" className="dec" > < img src={Facebook} alt="" width="40px" height="40px" /> </a>
                            <a href="" className="ml-3 dec" > < img src={Instagram} alt="" width="30px" height="30px" /> </a>
                            <a href="" className="dec" > < img src={Youtube} alt="" width="70px" height="70px" /> </a> <div >
                                <a href="" className="dec" > < img src={Android} alt="" width="120px" height="50px" /> </a>
                                <a href="" className="ml-3 dec" > < img src={Mac} alt="" width="120px" height="60px" /> </a>
                            </div>
                        </div>
                        <div className="col-sm-5" >
                            <form class="form-inline my-2 my-lg-0" >
                                <input name="search" className="form-control searchfooter mr-sm-2" type="search" placeholder="Get your items now ..." />
                                <button class="btn btn-warning my-2 my-sm-0" type="submit" > Get it </button> </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;