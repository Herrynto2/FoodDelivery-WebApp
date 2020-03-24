import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Slider from '../img/slider1.png'
import Slider2 from '../img/slider2.png'
import Slider3 from '../img/slider3.png'



class SliderItems extends React.Component {
    items = [{
        src: Slider,
        altText: '',
        caption: '',
        header: '',
        key: '1'
    },
    {
        src: Slider2,
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

export default SliderItems;