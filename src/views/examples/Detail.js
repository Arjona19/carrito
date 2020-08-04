import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    UncontrolledAlert
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Detail extends React.Component {
    constructor(props) {
        super(props);

        let productId = props.match.params.productId;
        this.state = { arrayTemp:[] , NumRows:0, productId : productId, product : ''}
        this.getProduct = this.getProduct.bind(this);
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

      async getProduct(){

        let productId = this.state.productId;

        await fetch('http://localhost:3000/api/'+ productId, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          })
        })
        .then(response => {
          return response.json()
        })
        .then((data) => {
          //console.log(result[0]);
          this.setState({product: data[0]});
        })
      }

    componentDidMount() {

        this.setState({arrayTemp:this._getDataToShoppingCart()});
        this.setState({NumRows:this._getNumberOfItemsInTheShoppingCart()});
        this.getProduct();


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
                        <Container className="pt-lg-7">
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <Card className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-white">
                                            <div className="text-muted text-center mb-3">
                                                <h3>{this.state.product.titulo}</h3>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <div className="text-center text-muted mb-4">
                                            <img
                                                    alt="..."
                                                    className="img-fluid"
                                                    src={require("assets/img/brand/dev-loopers.png")}
                                                    style={{ width: "450px" }}
                                                />
                                            </div>
                                            <Form role="form">
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                      <strong>Descripción :</strong>{this.state.product.descripcion}
                                                    </p>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                      <strong>Precio :</strong> $ {this.state.product.precio} MXN
                                                    </p>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                      <strong>Autor :</strong>{this.state.product.autor}
                                                    </p>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                      <strong>Tecnología :</strong>{this.state.product.tecnologia}
                                                    </p>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                      <strong>Disponible :</strong>{this.state.product.estatus}
                                                    </p>
                                                </FormGroup>
                                            </Form>
                                            <div className="text-center">
                                            <Button
                            className="my-4"
                            color="info"
                            type="button" 
                            onClick={this.updateUserData}              
                          >
                            Agregar a carrito
                          </Button>
                          </div>
                          <br></br>
                          <div className="mt-5 py-5 border-top text-center">
                              <Row className="justify-content-center">
                                {/*
                                  <Col lg="6">
                              <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                  <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                      <strong>Nombre completo :</strong>
                                  </InputGroupText>
                                  </InputGroupAddon>
                                  <Input 
                                  placeholder="Nombre de completo"
                                  value={this.state.name}
                                  name="name"
                                  onChange={this.handleChange}
                                  type="text" />
                              </InputGroup>
                              </FormGroup>
                              </Col>
                          <br></br>
                        
                                                    <Col lg="6">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>Correo electrónico :</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Correo electrónico"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            type="text" />
                          </InputGroup>
                        </FormGroup>
                                                </Col>
                          */}
                                                    <Col lg="12">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>Comentario :</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Comentario"
                            value={this.state.phone}
                            name="phone"
                            onChange={this.handleChange}
                            type="textarea" />
                          </InputGroup>
                        </FormGroup>
                                                </Col>
                                                <Button
                            className="my-4"
                            color="success"
                            type="button" 
                            onClick={this.updateUserData}              
                          >
                            Comentar
                          </Button>
                                                </Row>
                                            </div>
                                            
                                            <div className="mt-5 py-5 border-top text-center">
                                                <Row className="justify-content-center">
                                                    <Col lg="12">
                                                <UncontrolledAlert color="success" toggle={false}>
          <span className="alert-inner--text ml-1">
            <strong>Nombre del usuario!</strong> Aqui va el comentario!
          </span>
        </UncontrolledAlert>
                                                </Col>
                                                </Row>
                                            </div>
                                        </CardBody>
                                    </Card>
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

export default Detail;