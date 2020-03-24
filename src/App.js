import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Main from '../src/pages/Main'
import Signup from '../src/pages/Signup'
import ForgotPassword from '../src/pages/ForgotPassword'
import Items from '../src/pages/Items'
import Restaurant from '../src/pages/Restaurant'
import CreateRestaurant from '../src/pages/Createresto'
import Profile from '../src/pages/Profile'
import Profileuser from '../src/pages/ProfileUser'
import Profileresto from '../src/pages/ProfileResto'
import CartsItem from '../src/pages/Carts'
import CartID from '../src/pages/Checkout'
import Itemsresto from '../src/pages/Itemsresto'
import ItemsRestoDetail from '../src/pages/Itemsrestodetail'
import Verify from '../src/pages/Signupverify'
import ItemsID from '../src/pages/ItemsID'
import RestaurantID from '../src/pages/RestaurantID'
import CategoryDrink from '../src/pages/Category-Drink'
import CategoryFood from '../src/pages/Category-Food'
import Modals from '../src/pages/Modals'

function App() {
    return ( 
        <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
            <Switch >
            <Route exact path = "/"render = {(props) => ( < Main {...props }/>)}/>
                <Route path = "/home" render = {(props) => ( < Home {...props }/>)}/>
                <Route path = "/Login" render = {(props) => (<Login {...props }/>)}/>
                <Route path = "/verify" render = {(props) =>( < Verify {...props }/>)}/>
                <Route path = "/signup" render = {(props) => ( < Signup {...props }/>)}/>
                <Route path = "/forgot-password" render = {(props) => ( < ForgotPassword {...props }/>)}/>
                <Route path = "/browse-items" render = {(props) =>( < Items {...props }/>)}/>
                <Route path = "/detail-items/:id" render = {(props) =>( < ItemsID {...props }/>)}/>
                <Route path = "/browse-restaurant" render = {(props) => ( < Restaurant {...props }/>)}/>
                <Route path = "/detail-restaurant/:id" render = {(props) => ( < RestaurantID {...props }/>)}/>
                <Route path = "/browse-category/2" render = {(props) => ( < CategoryDrink {...props }/>)}/>
                <Route path = "/browse-category/1" render = {(props) => ( < CategoryFood {...props }/>)}/>
                <Route path = "/joinus" render = {(props) => ( < CreateRestaurant {...props }/>)}/>
                <Route path = "/profile" render = {(props) =>( < Profile {...props }/>)}/>
                <Route path = "/userprofile" render = {(props) =>( < Profileuser {...props }/>)}/>
                <Route path = "/restaurantprofile" render = {(props) => ( < Profileresto {...props }/>)}/>
                <Route path = "/items" render = {(props) => ( < Itemsresto {...props }/>)}/>
                <Route path = "/restaurant-items/:id" render = {(props) =>( < ItemsRestoDetail {...props } />)}/>
                <Route path = "/browse-items/:id" render = {(props) =>( < ItemsID {...props }/>)}/>
                <Route path = "/cart" render = {(props) =>( < CartsItem {...props }/>)}/>
                <Route path = "/carts/:id" render = {(props) =>( < CartID {...props }/>)}/>
                <Route path = "/modals" render = {(props) => ( < Modals {...props }/>)}/>
            </Switch> 
        </BrowserRouter>
        );
    }
export default App;