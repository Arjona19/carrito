import React from "react";
import swal from 'sweetalert';
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Hero from "./IndexSections/Hero.js";

import {
  Button,
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

class Index extends React.Component {

  constructor(props){
    super(props);
    this.state = { arrayOriginal:[] , arrayTemp:[] , NumRows:0 }
    this.handleChange = this.handleChange.bind(this);
    this._addProductToShoppingCart = this._addProductToShoppingCart.bind(this);
    this.getProducts = this.getProducts.bind(this);
    
  }
  
  handleChange(event) {
    const target = event.target;
    let nam = target.name;
    let val = target.value;
    this.setState({[nam]: val});
  }

  async getProducts(){
    //http://localhost:3000/api/mostsales
    //https://dev-loopers.herokuapp.com/api/
    await fetch('https://dev-loopers.herokuapp.com/api/mostsales', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    })
    .then(response => {
      return response.json()
    })
    .then((result) => {
      let _temp = result;

      let mostsales = [];

      _temp.forEach(element => {
        if(element.unidadesVendidas >= 3){
          mostsales.push(element);
        }
        //console.log(element);
      });
      //console.log(result);
      this.setState({arrayOriginal:mostsales});
    })
  }


 _addProductToShoppingCart(event){


  event.preventDefault();

  let userSession = localStorage.getItem('user');

  console.log(userSession);
  if(userSession !== null){

    const _id = event.currentTarget.id;
    //busco en eel arreglo el item
    let product = this.state.arrayOriginal[_id];

    let shoppingCart = localStorage.getItem('shoppingCart'); //primero verficamos si hay algo en session.

    if(shoppingCart == ""){ //<--------- carrito inicial.

      let shoppingCart_temp = [];
      shoppingCart_temp.push(product);

      localStorage.shoppingCart = JSON.stringify(shoppingCart_temp);

      //alert('El manual ha sido agregado al carrido con exito!.'); //<------------------ cambiarlo a modal
      swal("Exito!", "El manual ha sido agregado al carrido con exito!", "success");
    
    }else{

      let shoppingCart_temp = JSON.parse(localStorage.shoppingCart); //<-- recupero los items agregados

      //---- comprobamos si existe un item 
      let existInShoppingCart = false;

      shoppingCart_temp.forEach(itemInShoppingCart => {

        if(product.ID == itemInShoppingCart.ID){
          existInShoppingCart = true;
        }
        
      });

      //----

      if(existInShoppingCart == true){

        //alert('no puedes agregarlo, ya esta agregado en el carrito!. '); //<------------------ cambiarlo a modal
        swal("Advertencia!", "No puedes agregarlo, ya esta agregado en el carrito", "warning");
      }else{
        shoppingCart_temp.push(product);
        localStorage.shoppingCart = JSON.stringify(shoppingCart_temp);

        //alert('El manual ha sido agregado al carrido con exito!.'); //<------------------ cambiarlo a modal
        swal("Exito!", "El manual ha sido agregado al carrido con exito!", "success");
        
      }

    }

    this.state.arrayTemp = this._getDataToShoppingCart();
    this.setState({NumRows:this._getNumberOfItemsInTheShoppingCart()});

  }else{
    window.location.href = "/login-page";
  }

  
}

_getDataToShoppingCart(){

  try {

    if(localStorage["user"]){
      let shoppingCart = localStorage.getItem('shoppingCart'); 

      if(shoppingCart !== ""){

        let shoppingCart_temp = JSON.parse(localStorage.shoppingCart); 

        return shoppingCart_temp;
      }else{

        return [];
      }
    }else{
      localStorage.setItem('shoppingCart', []);
    }
    
  } catch (error) {
    console.log(error);
  }

  

}

_getNumberOfItemsInTheShoppingCart(){

  try {

    if(localStorage["user"]){
      let shoppingCart = localStorage.getItem('shoppingCart'); 

      if(shoppingCart !== ""){
        let shoppingCart_temp = JSON.parse(localStorage.shoppingCart); 
  
        
        return shoppingCart_temp.length;
      }else{
        
        return 0;
      }

    }else{
      localStorage.setItem('shoppingCart', []);
    }

  } catch (error) {
    console.log(error);
  }

}
  componentDidMount() {

    this.getProducts();

    this.setState({arrayTemp:this._getDataToShoppingCart()});
    this.setState({NumRows:this._getNumberOfItemsInTheShoppingCart()});

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar carrito={this.state.arrayTemp} items={this.state.NumRows}/>
        <main ref="main">
        <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/dev-loopers-white.png")}
                      style={{ width: "500px" }}
                    />
                    <p className="lead text-white">
                      Consigue los mejores recursos para aprender una nueva teconologia.
                    </p>
                    <div className="btn-wrapper mt-5">
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color="default"
                        href="/login-page"
                        size="lg"
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-send" />
                        </span>
                        <span className="btn-inner--text">Empezar</span>
                      </Button>{" "}

                    </div>

                  </Col>
                </Row>
  
              </div>
            </Container>
            <Container className="pt-lg-1">
            <h1 className="display-3 text-white">
                 Manuales mas vendidos{" "}
              </h1>
              <br/>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    {/* {es como un foreach} */}
                    {this.state.arrayOriginal.map(
                      (item, i) => 
                      <Col lg="4" key={item.ID}>
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="">
                        <img
                          alt="..."
                          className="img-fluid mb-2"
                          src={"https://dev-loopers.herokuapp.com/assets/images/portadas/"+item.imagen}
                          style={{ width: "500px" }}
                        />
                          <h6 className="text-success text-uppercase">
                            {item.titulo}
                          </h6>
                          <p className="description mt-3">
                            {item.descripcion}
                          </p>
                          <div>
                          <Badge color="primary" pill className="mr-1">
                                <span className="btn-inner--icon">
                                    <i className="fa fa-user-circle mr-2" />
                                </span>
                                {item.autor}
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                                <span className="btn-inner--icon">
                                    <i className="fa fa-money mr-2" />
                                </span>
                               $ {item.precio}.00 MXN
                            </Badge>                           
                             <Badge color="warning" pill className="mr-1">
                                {item.tecnologia}
                            </Badge>
                            <Badge color="danger" pill className="mr-1">
                                Unidades vendidas : {item.unidadesVendidas}
                            </Badge>                               
                          </div>
                      
                        <Button
                            className="mt-4  btn-icon"
                            color="success"
                            id={i}
                            href="#pablo"
                            onClick={this._addProductToShoppingCart}
                          >
                      <span className="btn-inner--icon">
                        <i className="fa fa-cart-plus mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        AGREGAR AL CARRITO
                      </span>
                          </Button>
                          <Button
                            className="mt-4  btn-icon"
                            color="info"
                            id={i}
                            href={"/detail-page/"+item.ID}
                          >
                      <span className="btn-inner--icon">
                        <i className="fa fa-eye mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        VER DETALLES
                      </span>
                          </Button>

                        </CardBody>
                      </Card>
                    </Col>
                    )}
                    
                   
                  </Row>
                </Col>
              </Row>
            </Container>
 
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
