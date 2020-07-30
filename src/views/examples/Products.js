import React from "react";
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
    this._addToCart = this._addToCart.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this._setTotal = this._setTotal.bind(this);
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

  async addProductToShoppingCart(event){
    event.preventDefault();
    let productId = event.currentTarget.id;

    await fetch('http://localhost:3000/api/GetProduct/'+ productId,{
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    })
    .then(response => {
      return response.json()
    })
    .then((result) => {

      if(JSON.stringify(result[0]['ID']) !== undefined ){

        let shoppingCartArrayOriginal = localStorage.getItem('shoppingCart');

        let shoppingCartArrayTemp = [].concat(shoppingCartArrayOriginal);

        shoppingCartArrayTemp.push(JSON.stringify(result[0]));

        localStorage.setItem('shoppingCart', shoppingCartArrayTemp);

        //let shoppingCartArrayTemp = shoppingCartArrayOriginal.slice();
        
    

        //let shoppingCartArray = localStorage.shoppingCart;
        //shoppingCartArray.push(JSON.stringify(result[0]));
       // shoppingCartArray = 
       // localStorage.shoppingCart.push(JSON.stringify(result[0]));

        
        //let carro = localStorage.getItem('shoppingCart');

        console.log('carro: '+shoppingCartArrayOriginal);
      }
      
      //this.setState({data:result});
    })
  }

  _setTotal(){
    let arrayTemp = JSON.parse(localStorage.cart);
    var total =0;
    arrayTemp.map((i)=> total = total + i.precio);
    localStorage.total = total;
  }

  _addToCart(event){
    event.preventDefault();
    const _id = event.currentTarget.id;
    
    let product = this.state.arrayOriginal[_id];
    let existInShoppingCart = false;

    this.state.arrayTemp.forEach(itemInShoppingCart => {

      if(product.ID == itemInShoppingCart.ID){
        existInShoppingCart = true;
      }
      
    });

    if(existInShoppingCart){
      alert('no puedes agregarlo, ya esta agregado en el carrito!. ');
    }else{
       this.state.arrayTemp.push(product);

        localStorage.cart = JSON.stringify(this.state.arrayTemp);
      
      this.setState({NumRows:JSON.parse(localStorage.cart).length})
      this._setTotal();
      alert('El manual ha sido agregado al carrido con exito!.');
    }

  }

  componentDidMount() {
      this.getProducts();
      //Cuando te haya corrido agrega un libro, despues descomentas esto
      // this._setTotal();
      // this.setState({arrayTemp:JSON.parse(localStorage.cart)})
      // this.setState({NumRows:JSON.parse(localStorage.cart).length})
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
                               $ {item.precio}.00
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
                            onClick={this._addToCart}
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
