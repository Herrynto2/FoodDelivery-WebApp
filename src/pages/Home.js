import React from 'react';
import Navbars from '../components/Navbar'
import Jumbotrons from '../components/Jumbotron'
import Footer from '../components/Footer'
import Joinus from '../components/Joinus';
import Slider from '../components/SliderItems'
import Slidersresto from '../components/SliderResto'

class Home extends React.Component {


    render() {
        return ( 
        < div > 
        { /* NAVBAR */ } 
            <Navbars/> 
        { /* JUMBOTRON */ } 
        <Jumbotrons /> 
        { /* SLIDER */ } 
        <Slider /> 
        { /* JOIN US */ } 
        <Joinus /> 
        { /* SliderResto */ } 
        <Slidersresto /> 
        { /* FOOTER */ } 
        <Footer />
        </div>
        )
    }
}

export default Home;