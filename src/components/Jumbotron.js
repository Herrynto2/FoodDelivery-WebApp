import React from 'react';
import { Link } from 'react-router-dom'
import {
    Jumbotron,
    Button
} from 'reactstrap';

class Jumbotrons extends React.Component {
    render() {
        return (
            <div >
                <Jumbotron className="slide1" >
                    <div className="carousel slide" >
                        <div className="carousel-inner" >
                            <div className="carousel-item active" >
                                <img src="jumbotron-bg.jpg" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                    </div>
                    <div className="text-jumbotron" > Enjoy your < span className="bold" > food < br /> </span>and give the best <span className="bold">response</span > </div>
                    <div className="text-center" > < Link to='/browse-items' > < Button className="shop" color="btn btn-warning" > Shop Now </Button></Link > </div>
                </Jumbotron>
            </div>
        )
    }
}

export default Jumbotrons;