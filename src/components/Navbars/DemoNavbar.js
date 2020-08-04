import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import ButtonLogin from "components/ButtonLogin.js";
import ItemsCart from "components/itemsCart.js";
// reactstrap components
import {
  Button,
  Badge,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  Modal,
  Container,
  Row,
  Col,
} from "reactstrap";

class DemoNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collapseClasses: "",
      collapseOpen: false,
      defaultModal: false
    };
    //this._getTotalOfShoppingCart = this._getTotalOfShoppingCart.bind(this);
    this.Log_Out = this.Log_Out.bind(this);
  }

  componentDidMount() {  
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  Log_Out(event){  
    event.preventDefault();
    localStorage.removeItem('user');
    //localStorage.removeItem('shoppingCart'); //total

    localStorage.shoppingCart = JSON.stringify([]);

    localStorage.clear();
    //localStorage.setItem('shoppingCart', []);

    window.location.href = "/";
  };

  getTotalOfShoppingCart(){
    try {

      if(localStorage["user"]){
        let shoppingCart = localStorage.getItem('shoppingCart');

        if(shoppingCart !== null || shoppingCart !== ""){
          let shoppingCart_temp = JSON.parse(localStorage.shoppingCart);
          let total =0;
          shoppingCart_temp.map((i)=> total = total + i.precio);

          return total;
        }else{
          return 0;
        }
      }else{
        localStorage.setItem('shoppingCart', []);
        return 0;
      }
  

    } catch (error) {
      return 0;
    }


  }

  async PayWithPaypal(event){  
    event.preventDefault();

    let shoppingCart = localStorage.getItem('shoppingCart');

    //if(shoppingCart !== "" ||shoppingCart !== null || shoppingCart !== undefined){

    if(localStorage["shoppingCart"]){

      let shoppingCart_temp = JSON.parse(localStorage.shoppingCart);
      let total =0;
      shoppingCart_temp.map((i)=> total = total + i.precio);

      let user = JSON.parse(localStorage.user);

      
      await fetch('https://dev-loopers.herokuapp.com/api/pay',{
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }),
        body: new URLSearchParams({
          'userId': user.userId,
          'products': JSON.stringify(shoppingCart_temp),
          'total': total
        }),
      }).then(response => {
        return response.json()
      })
      .then((result) => {

        console.log(result.paypal_link);
        window.location.href = result.paypal_link;

        localStorage.removeItem('shoppingCart'); 
        localStorage.setItem('shoppingCart', []);
        
      });

      

    }

    
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/dev-loopers-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/dev-loopers.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavItem>
                  <NavLink href="/" >
                    Inicio
                  </NavLink>
                </NavItem>                
                <NavItem>
                  <NavLink href="/products-page" >
                    Productos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/aboutus-page" >
                    Acerca de
                  </NavLink>
                </NavItem>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <ButtonLogin />
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-cart-plus mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Carrito
                      </span>
                      <Badge color="danger" href="#pablo">
                        {this.props.items}
                      </Badge>
                    </Button>
                    <Modal
                      className="modal-dialog-centered"
                      isOpen={this.state.defaultModal}
                      toggle={() => this.toggleModal("defaultModal")}
                      >
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">
                          Mi carrito
                        </h6>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => this.toggleModal("defaultModal")}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ItemsCart cart={this.props.carrito}/>
                      <Row>
                        <Col xs="6">
                            <span>Total a pagar:</span>
                        </Col>
                        <Col xs="6">
                        <FormGroup>
                          <Input disabled placeholder="$ 0.00 MXN" value={'$ '+this.getTotalOfShoppingCart()+' MXN'} type="text" />
                        </FormGroup>
                        </Col>
                      </Row>
                      </div>
                      <div className="modal-footer">
                        <Button color="success" onClick={this.PayWithPaypal} type="button">
                          PROCEDER A PAGAR
                        </Button>
                        {/*
                        <Button
                          className="ml-auto"
                          color="link"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => this.toggleModal("defaultModal")}
                        >
                          Cerrar
                        </Button>
                        */}
                      </div>
                    </Modal>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
