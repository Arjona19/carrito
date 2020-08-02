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
    Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { arrayTemp:[] , NumRows:0 }
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
                        <Container className="pt-lg-7">
                            <Row className="justify-content-center">
                                <Col lg="12">
                                    <Card className="bg-secondary shadow border-0">
                                        <CardHeader className="bg-white">
                                            <div className="text-muted text-center mb-3">
                                                <img
                                                    alt="..."
                                                    className="img-fluid"
                                                    src={require("assets/img/brand/dev-loopers.png")}
                                                    style={{ width: "450px" }}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <div className="text-center text-muted mb-4">
                                                <h3>Acerca de</h3>
                                            </div>
                                            <Form role="form">
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                        DevLoopers es una página donde podras encontrar diferentes manuales
                                                        los cuales podrás utilizar para lo que necesites, ya sea para el trabajo o
                                                        la escuela.
                                                    </p>
                                                </FormGroup>
                                            </Form>
                                            <br></br>
                                            <br></br>
                                            <div className="text-center text-muted mb-4">
                                                <h3>Misión</h3>
                                            </div>
                                            <Form role="form">
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                    Contribuimos a la difusión de la programación con diferentes tecnologías 
                                                    creando experiencias para el encuentro con el conocimiento.
                                                    </p>
                                                </FormGroup>
                                            </Form>
                                            <br></br>
                                            <br></br>
                                            <div className="text-center text-muted mb-4">
                                                <h3>Visión</h3>
                                            </div>
                                            <Form role="form">
                                                <FormGroup className="mb-3">
                                                    <p className="text-center">
                                                    Ser el referente del enriquecimiento del conocimiento de las personas, 
                                                    propiciando la transformación de la comunidad a la que servimos.
                                                    </p>
                                                </FormGroup>
                                            </Form>
                                            <br></br>
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

export default AboutUs;