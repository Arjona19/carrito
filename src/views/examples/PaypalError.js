import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class PaypalError extends React.Component {

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
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
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
                    <Col className="order-lg-3 text-lg-center align-self-lg-center"
                      lg="4">
                      <div className="card-profile-actions py-4 mt-lg-0" style={{top: "25px;"}}>
                        <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/brand/paypal.png")}
                            style={{ width: "250px" }}
                        />
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0" style={{bottom: "35px"}}>
                        <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/brand/dev-loopers.png")}
                            style={{ width: "200px" }}
                        />
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                      <div className="text-center">
                  <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/brand/error.png")}
                            style={{ width: "150px" }}
                        />
                        </div>
                    <h3>
                      Error al realizar la compra!
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin" />
                      Hubo un error al realizar el pago, por favor verifique que todos los datos proporcionados
                      hayan sido correctos...
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                    </Row>
                  </div>
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

export default PaypalError;