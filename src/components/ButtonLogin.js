//import React from "react";
import React from 'react';
import {
    Button,DropdownToggle, DropdownMenu, DropdownItem,
    UncontrolledDropdown
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
                <UncontrolledDropdown group>
                    <DropdownToggle caret color="secondary">
                        <span className="btn-inner--icon">
                        <i className="fa fa-user-circle mr-2" />
                        </span>
                        {this.state.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href="/profile-page">
                            Profile
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={this.Log_Out}>
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>    
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