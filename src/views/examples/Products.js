import React from "react";
import swal from 'sweetalert';
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Products extends React.Component {
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
    await fetch('https://dev-loopers.herokuapp.com/api/', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    })
    .then(response => {
      return response.json()
    })
    .then((result) => {
      this.setState({arrayOriginal:result});
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
            <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h2 className="display-3 text-white">
                        Aprende con nosotros{" "}
                        <span>Encuentra contenido digital.</span>
                      </h2>
                      <p className="lead text-white">
                       9 de cada 10 estudiantes comienzan a generar ingresos con nuestros manuales.
                      </p>

                    </Col>
                  </Row>
                </div>
              </Container>
            <Container className="pt-lg-7">
            <h1 className="display-3 text-white">
                 Nuestros manuales{" "}
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

export default Products;
