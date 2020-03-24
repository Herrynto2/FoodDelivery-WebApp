import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Slider from '../img/slider4.png'

class Slidersresto extends React.Component {
    items = [{
        src: Slider,
        altText: 'Slide 1',
        caption: '',
        header: '',
        key: '1'
    },
    {
        src: Slider,

        altText: 'Slide 1',
        caption: '',
        header: '',
        key: '1'
    },
    {
        src: Slider,
        altText: 'Slide 1',
        caption: '',
        header: '',
        key: '1'
    }
    ];
    render() {
        return (
            <div >
                <div className="sliders" >
                    <UncontrolledCarousel items={this.items} />
                </div>
            </div>
        )
    }
}

export default Slidersresto;