import React from 'react';
import { Media } from 'reactstrap';

class Reviews extends React.Component {

    render() {
        return (
            <div >
                <div className="marginreview" >
                    <div className='container' >
                        <div className='row justify-content-center' >
                            <div className='col-lg-9' >
                                <div className="reviews-box" >
                                    <Media >
                                        <Media left >
                                            <img src={this.props.images} className="img-reviews" />
                                        </Media>
                                        <Media body >
                                            <Media heading className="reviewer-guest" > {this.props.name}
                                            </Media> <span className="text-muted daterev" > Date post: {this.props.date_created} </span>
                                            <p> {this.props.review} </p>
                                        </Media> </Media>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;