//import React from "react";
import React, { useState } from 'react';
import {
    Button,
    NavLink,
    NavItem,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
    
  } from "reactstrap";

class ButtonLogin extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { name: '', status:false};

    }
    //Valido si existe el usuario
    componentDidMount(){
        if (localStorage.user == null) {
            this.setState({status:false});
        }else{
            let user = JSON.parse(localStorage.user);
            this.setState({name: JSON.parse(user.username)});
            this.setState({status:true});
        }
        
        //alert(JSON.stringify(JSON.parse(localStorage.cart)));
    }

    Log_Out(event){
        event.preventDefault();
    
        localStorage.removeItem('user');
        window.location.href = "/";
      };

    

    render(){
        if (this.state.status) {

            return (
                <>
                <NavItem>
                    <NavLink href="/" onClick={this.Log_Out} >
                        <span className="btn-inner--icon">
                        <i className="fa fa-user-circle mr-2" />
                        </span>
                        {this.state.name}
                    </NavLink>
                </NavItem>      
        </>);
        }else{
            return (
            <>
            <Button
                className="btn-neutral btn-icon"
                color="default"
                href="/login-page"
                >
                    <span className="btn-inner--icon">
                    <i className="fa fa-user-circle mr-2" />
                    </span>
                    <span className="nav-link-inner--text ml-1">
                    Login 
                    </span>
            </Button> 
        </>);
        }
    }
}

export default ButtonLogin;