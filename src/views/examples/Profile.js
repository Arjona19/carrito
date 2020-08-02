import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = { username: '', name: '', email: '',phone: '', arrayTemp:[] , NumRows:0};
    this.getUserData = this.getUserData.bind(this);
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

      await fetch('http://localhost:3000/api/user/'+userId, {
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
        this.setState({username: JSON.stringify(data[0]['username']), name: JSON.stringify(data[0]['name']), email: JSON.stringify(data[0]['email']),phone: JSON.stringify(data[0]['phone'])});
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
                          href="/profileedit-page"
                          size="sm"
                        >
                          Editar perfil
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {this.state.username}
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.name}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.phone}
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

export default Profile;
