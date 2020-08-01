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
    await fetch('http://localhost:3000/api/', {
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


/*
getTotalOfShoppingCart(){
  try {

    if(localStorage["user"]){

    }else{
      localStorage.setItem('shoppingCart', []);
    }


    let shoppingCart = localStorage.getItem('shoppingCart');

    if(shoppingCart !== null){
      let shoppingCart_temp = JSON.parse(localStorage.shoppingCart);
      let total =0;
      shoppingCart_temp.map((i)=> total = total + i.precio);

      return total;
    }else{
      return 0;
    }

  } catch (error) {
    return 0;
  }


}
*/

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
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alerts?ref=adsr-landing-page"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="btn-inner--text">Manuales gratis</span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-cloud-download-95" />
                          </span>
                          <span className="btn-inner--text">
                            Suscribete
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            <Container className="pt-lg-7">
            <h1 className="display-3 text-white">
                 Manuales mas vendidos{" "}
              </h1>
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
                          src={item.imagen}
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
                                {this.state.tecnologias}
                            </Badge>                             
                          </div>
                        {/* <Form role="form" className="hidden">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <Input 
                              value="wddeefeff"
                              name="img"
                              onChange={this.handleChange}
                              type="text" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Input
                                value="Hola"
                                name="title"
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                        </FormGroup>
                      </Form> */}
                      {/* obtengo el id del arreglo desde el botton */}
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
