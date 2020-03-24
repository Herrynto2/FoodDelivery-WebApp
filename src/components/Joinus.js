import React from 'react';
import { Link } from 'react-router-dom'

class Joinus extends React.Component {
    render() {
        return (
            <div>
                <div className="bgjoinus">
                    <div className="container">
                        <div className="row p-5">
                            <div className="col-sm-6"></div>
                            <div className="col-sm-6 justify-content-center body-joinus">
                                <h1 className="bold colorjoinus mt-2 mb-3">Register your restaurant in our marketplace</h1>
                                <span className="contentjoinus">Axelcious already has many partners and is very trusted Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptatem.</span>
                                <div className="mt-3"><Link to="/joinus"><button class="btn btn-dark btnjoinus my-2 my-sm-0" type="submit">Join Us</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Joinus;