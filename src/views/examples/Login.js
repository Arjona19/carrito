/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  Modal
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {username:'', password:''}
    this.handleChange = this.handleChange.bind(this);
    this.Log_in = this.Log_in.bind(this);
    
  }

  handleChange(event) {
    const target = event.target;
    let nam = target.name;
    let val = target.value;
    this.setState({[nam]: val});
  }

 async Log_in(event) {
    event.preventDefault();
    await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }),
      body: new URLSearchParams({
        'username': this.state.username,
        'password': this.state.password
      }),
    })
    .then(response => {
      /*if(response.status >= 400 && response.status < 600) {
        //alert('400');
      }*/
      return response.json()
    })
    .then((data) => {
     
      //console.log(JSON.stringify(data));

      if(JSON.stringify(data['iduser']) !== undefined ){

        localStorage.user = JSON.stringify({'userId': JSON.stringify(data['iduser']), 'username': JSON.stringify(data['username'])});

        let userSessionData = JSON.parse(localStorage.user);

        if(userSessionData.userId !== undefined || userSessionData.userId !== null || userSessionData.userId !== ""){

          //let shoppingCartArray = ['{id:1}', '{id:2}'];
          //localStorage.shoppingCart = shoppingCartArray;
          
          localStorage.setItem('shoppingCart', []);

          window.location.href = "/";
        }

        

      }else{

        alert('Usuario y/o contraseña no validos'); //<- cambiar a modal.
        
      }

    })
    
  }




  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
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
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white">
                      <div className="text-muted text-center mb-3">
                          <img
                          alt="..."
                          className="img-fluid"
                          src={require("assets/img/brand/dev-loopers.png")}
                          style={{ width: "500px" }}
                        />
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Iniciar sesion</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="User"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleChange}
                            type="text" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              value={this.state.password}
                              type="password"
                              name="password"
                              onChange={this.handleChange}
                              autoComplete="off"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Recuérdame</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.Log_in}
                          >
                            Iniciar sesión
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="/register-page"
                      >
                        <small>Crear una cuenta nueva</small>
                      </a>
                    </Col>
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

export default Login;

