import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../assets/Style.css'
import cart from '../img/cart.png'
import carts from '../img/cartsub.png'
import { connect } from 'react-redux'
import profile from '../img/profile.png'
import profiles from '../img/profile2.png'
import { logoutUser } from '../redux/action/auth'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Navbars extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        scrolled: false,
        login: false
    }
    this.loginHandler = () => {
        this.setState({ login: true })
    }
    this.logoutHandler = () => {
        this.setState({ login: false })
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.state = {
        collapsed: true
    }
}

logout = () => {
    this.props.logoutUser()
    this.props.history.push('/login')
}
componentDidMount() {
    if (this.props.token) {
        this.setState({ login: true })
    } else {
        this.setState({ login: false })
    }
    window.addEventListener('scroll', () => {
        const isTop = window.scrollY < 650;
        if (isTop !== true) {
            this.setState({ scrolled: true })
        } else {
            this.setState({ scrolled: false })
        }
    })
}
componentWillUnmount() {
    window.removeEventListener('scroll', e => {
        console.log(e)
    })
}


////Navbars Togler 
toggleNavbar() {
    this.setState({
        collapsed: !this.state.collapsed
    });
}

closeNavbar() {
    if (this.state.collapsed !== true) {
        this.toggleNavbar();
    }
}

render() {
    return (
    <div>
        <div className="position">
            <Navbar light expand="md" className={this.state.scrolled ? 'p-3 navbaruser' : 'p-3 navbars'} >
                <NavbarBrand className="ml-5 navbarbrand" href="">
                    < Link to="home" > <span className={this.state.scrolled ? 'inline texts' : 'inline text'}> axel</span><span className={this.state.scrolled ? 'inline brandtexts' : 'inline brandtext'}>cious</span >
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar className="collapse navbar-collapse">
                    <Nav className="ml-auto mr-5" navbar>
                        <NavItem >
                            <NavLink >
                                <Link to="/home" className="mr-5 margin text-decoration-none" href="/components/">
                                    <span className={this.state.scrolled ? 'inline texts' : 'inline text'}>Home</span>
                                </Link >
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="mr-3" >
                                <span className={this.state.scrolled ? 'texts' : 'text'}>Menu</span>
                                </DropdownToggle>
                                    <DropdownMenu right >
                                        <DropdownItem >
                                            <Link to="/browse-category/1" > <span className="allitems" >Food</span>
                                            </Link >
                                        </DropdownItem>
                                        <DropdownItem >
                                            <Link to="/browse-category/2" > <span className="allitems" > Drink </span>
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem >
                                            <Link to="/browse-items" className="text-decoration-none" ><span className="allitems" >All Items</span>
                                            </Link >
                                        </DropdownItem>
                                    </DropdownMenu>
                        </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink >
                                        <Link to="/browse-restaurant" className=" mr-4 text-decoration-none" href="/components/" >
                                            <span className={this.state.scrolled ? 'inline texts' : 'inline text'} > Restaurant </span>
                                        </Link >
                                        </NavLink> 
                                </NavItem> 
                        {
                                            this.state.login &&
                                            <NavItem>
                                                <NavLink >
                                                    <Link to="/cart" className=" mr-4 margin text-decoration-none cart" href="/components/" >
                                                        < img src={this.state.scrolled ? carts : cart} width="30px" alt="" className={this.state.scrolled ? 'carts' : 'carts'} /></Link >
                                                </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.login &&
                                            <NavItem >
                                                <NavLink > < Link to="/profile" className=" mr-4 margin text-decoration-none cart" href="/components/"><img src={this.state.scrolled ? profiles : profile} width="30px"
                                                    alt="" />
                                                </Link>
                                                </NavLink>
                                            </NavItem>
                                        } {!this.state.login &&
                                            <NavItem >
                                                <NavLink >
                                                    <Link to="/login" className="btnlogin" href="/components/" > < button type="button" className="btn btn-warning" > Login </button>
                                                    </Link >
                                                </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.login &&
                                            <NavItem >
                                                <NavLink >
                                                    <Link className="btnlogin" href="/components/" > < button type="button" onClick={e => this.logout()} className="btn btn-warning" > Logout </button></Link>
                                                </NavLink>
                                            </NavItem>
                                        } 
        </Nav> 
        </Collapse> 
        </Navbar> 
        </div> 
        </div>
        )
    }
}
const mapStateToProps = state => ({
                                token: state.auth.token
})
const mapDispatchToProps = {logoutUser}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbars))