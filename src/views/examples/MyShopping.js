import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class MyShopping extends React.Component {
    constructor(props) {
        super(props);
        this.state = { arrayTemp:[] , NumRows:0, arraySolds:[]}
    }
    _getAllSolds(){
      let user = JSON.parse(localStorage.user);
      fetch('https://dev-loopers.herokuapp.com/api/getAllSolds', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }),
        body: new URLSearchParams({
          'iduser': JSON.parse(user.userId)
        })
      })
      .then(response => {
        return response.json()
      })
      .then((data) => {
        this.setState({arraySolds:data});
      });
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
        this._getAllSolds();
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
                                                <h3>Mis compras</h3>
                                            </div>
                                        </CardHeader>
                                        <CardBody className="px-lg-5 py-lg-5">
                                            <div className=" text-muted mb-4">
                                            <table class="table">
                                                <thead class="thead-dark">
                                                    <tr>
                                                    <th scope="col" width="150px"></th>
                                                    <th scope="col">Titulo</th>
                                                    <th scope="col">Accion</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  {
                                                    this.state.arraySolds.map((item,i)=>
                                                    <tr key={i}>
                                                    <th scope="row">
                                                        <img
                                                            alt="..."
                                                            className="img-fluid"
                                                            src={require("assets/img/brand/dev-loopers.png")}
                                                            style={{ width: "150px" }}
                                                        />
                                                    </th>
                                                  <td>{item.titulo}</td>
                                                    <td>
                                                    <Button
                                                        className="mr-4 btn btn-outline-info"
                                                        href={"https://dev-loopers.herokuapp.com/api/download/"+item.archivo}
                                                    >
                                                        Descargar archivo
                                                    </Button>
                                                    </td>
                                                    </tr>
                                                )}
                                                   
                                                </tbody>
                                            </table>
                                            </div>
                                            <br></br>
                                            
                                            <div className="mt-5 py-5 border-top text-center">
                                                <Row className="justify-content-center">
                                                    <Col lg="12">
                                                        
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

export default MyShopping;