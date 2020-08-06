import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Form, Input, FormGroup, InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class ProfileEdit extends React.Component {

  constructor(props){
    super(props);
    this.state = { username: '', name: '', email: '',phone: '', arrayTemp:[] , NumRows:0};
    this.handleChange = this.handleChange.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    let nam = target.name;
    let val = target.value;
    this.setState({[nam]: val});
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

  async getUserData(){

    if(localStorage["user"]){

      let user = JSON.parse(localStorage.user);
      let userId = JSON.parse(user.userId);

      await fetch('https://dev-loopers.herokuapp.com/api/user/'+userId, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        })
      })
      .then(response => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        this.setState({username: data[0]['username'], name: data[0]['name'], email: data[0]['email'],phone: data[0]['phone']});
      });
    }

  }

  async updateUserData(event) {
    event.preventDefault();

    if(localStorage["user"]){

      let user = JSON.parse(localStorage.user);
      let userId = JSON.parse(user.userId);

      //https://dev-loopers.herokuapp.com/api/user/
      await fetch('https://dev-loopers.herokuapp.com/api/userupdate', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }),
        body: new URLSearchParams({
          'username': this.state.username,
          'name': this.state.name,
          'email': this.state.email,
          'phone': this.state.phone,
          'iduser': userId
        }),
      })
      .then(response => {
  
        return response.json()
      })
      .then((data) => {
       
        console.log(JSON.stringify(data));
      });
    }
  
    
  }

  componentDidMount() {
    this.setState({arrayTemp:this._getDataToShoppingCart()});
    this.setState({NumRows:this._getNumberOfItemsInTheShoppingCart()});

    this.getUserData();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar carrito={this.state.arrayTemp} items={this.state.NumRows}/>
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />

              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          href="/profile-page"
                          size="sm"
                        >
                          Cancelar Edicion
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                    </Col>
                  </Row>
                  <span />
                  <span />
                  <span />
                  <span />
                  <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>Nombre de usuario :</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Nombre de usuario"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleChange}
                            type="text" />
                          </InputGroup>
                        </FormGroup>

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

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <strong>Teléfono móvil :</strong>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Teléfono móvil"
                            value={this.state.phone}
                            name="phone"
                            onChange={this.handleChange}
                            type="text" />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">             
                          <Button
                            className="my-4"
                            color="success"
                            type="button" 
                            onClick={this.updateUserData}              
                          >
                            Guardar
                          </Button>
                        </div>
                  </Form>   
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default ProfileEdit;