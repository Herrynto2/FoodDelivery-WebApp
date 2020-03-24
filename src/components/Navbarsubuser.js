import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../assets/Style.css'
import cart from '../img/cartsub.png'
import { connect } from 'react-redux'
import profile from '../img/profile2.png'
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

class Navbarsub extends React.Component {
    constructor(props) {
        super(props)
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.closeNavbar = this.closeNavbar.bind(this);
        this.state = {
            collapsed: true,
            login: false
        }
        this.loginHandler = () => {
            this.setState({ login: true })
        }
        this.logoutHandler = () => {
            this.setState({ login: false })
        }
    }

    logout() {
        this.props.logoutUser()
        this.props.history.push('/login')
    }
    componentDidMount() {
        if (this.props.token) {
            this.setState({ login: true })
        } else {
            this.setState({ login: false })
        }
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
                <div className="navbarsub position">
                    <Navbar light expand="md" className='p-3' >
                        <NavbarBrand className="ml-5 navbarbrandsub" href="" > < Link to="home" > < span className="inline textsubbrand"> axel</span><span className="inline brandtexts">cious</span > </Link>
                        </NavbarBrand >
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar className="collapse navbar-collapse" >
                            <Nav className="ml-auto mr-5" navbar>
                                <NavItem >
                                    <NavLink><Link to="/home" className="mr-5 text-decoration-none" href="/components/" > <span className="textsub"> Home </span></Link >
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar >
                                    <DropdownToggle nav caret className="mr-3" >
                                        <span className="textsub" > Menu </span>
                                    </DropdownToggle>
                                    <DropdownMenu right >
                                        <DropdownItem >
                                            <Link to="/browse-category/1"> <span className="allitems" > Food </span></Link>
                                        </DropdownItem>
                                        <DropdownItem >
                                            <Link to="/browse-category/2" > < span className="allitems" > Drink </span></Link >
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem >
                                            <Link to="/browse-items" className="text-decoration-none" > < span className="allitems" > All Items </span></Link >
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem >
                                    <NavLink > < Link to="/browse-restaurant" className="text-decoration-none" href="/components/" > < span className="textsub mr-3" > Restaurant </span></Link > </NavLink>
                                </NavItem> {
                                    this.state.login &&
                                    <NavItem >
                                        <NavLink > < Link to="/cart" className="mr-4 margin text-decoration-none cartsub" href="/components/" > < img src={cart} width="30px" alt="" /> </Link>
                                        </NavLink>
                                    </NavItem>
                                } {
                                    this.state.login &&
                                    <NavItem >
                                        <NavLink > < Link to="/profile"
                                            className="mr-4 margin text-decoration-none cartsub"
                                            href="/components/" > < img src={profile}
                                                width="30px"
                                                alt="" />
                                        </Link>
                                        </NavLink>
                                    </NavItem>
                                } {
                                    !this.state.login &&
                                    <NavItem >
                                        <NavLink >
                                            <Link to="/login" href="/components/" > < button type="button" className=" btn btn-warning" > Login</button>
                                            </Link >
                                        </NavLink>
                                    </NavItem>
                                } {
                                    this.state.login &&
                                    <NavItem >
                                        <NavLink >
                                            <Link href="/components/" > < button type="button" onClick={e => this.logout()} className="btn btn-warning" > Logout </button></Link >
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
const mapDispatchToProps = { logoutUser }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbarsub))