import React from "react";
import swal from 'sweetalert';
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
        this.state = { arrayTemp:[] , NumRows:0, productId : productId, product : '', comentarios: [], comentario:''};
        this.handleChange = this.handleChange.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.getComentaries = this.getComentaries.bind(this);
        this.comentar = this.comentar.bind(this);
        this._addProductToShoppingCart = this._addProductToShoppingCart.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      let nam = target.name;
      let val = target.value;
      this.setState({[nam]: val});
    }

    _addProductToShoppingCart(event){


      event.preventDefault();
    
      let userSession = localStorage.getItem('user');
    
      console.log(userSession);
      if(userSession !== null){
    
        const _id = event.currentTarget.id;
        //busco en eel arreglo el item
        let product = this.state.product;
    
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

      async getProduct(){

        let productId = this.state.productId;
        console.log('productId :'+productId)

        await fetch('http://localhost:3000/api/producto/'+ productId, {
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

      async getComentaries(){

        let productId = this.state.productId;

        await fetch('http://localhost:3000/api/comentarios/'+ productId, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          })
        })
        .then(response => {
          return response.json()
        })
        .then((data) => {
          //console.log(data.length);
          this.setState({comentarios: data});
        })
      }

      async comentar(event) {

        event.preventDefault();

        let user = JSON.parse(localStorage.user);
        let productId = this.state.productId;

        await fetch('http://localhost:3000/api/comentarios', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }),
          body: new URLSearchParams({
            'usuarioId': JSON.parse(user.userId),
            'productoId': productId,
            'comentario': this.state.comentario
          }),
        })
        .then(response => {
          /*if(response.status >= 400 && response.status < 600) {
            //alert('400');
          }*/
          return response.json()
        })
        .then((data) => {
          console.log(data);
          window.location.href = window.location.href;
        })
        
      }

    componentDidMount() {

        this.setState({arrayTemp:this._getDataToShoppingCart()});
        this.setState({NumRows:this._getNumberOfItemsInTheShoppingCart()});
        this.getProduct();
        this.getComentaries();


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
                            onClick={this._addProductToShoppingCart}              
                          >
                            Agregar a carrito
                          </Button>
                          </div>
                          <br></br>
                          <div className="mt-5 py-5 border-top text-center">
                              <Row className="justify-content-center">
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
                            value={this.state.comentario}
                            name="comentario"
                            onChange={this.handleChange}
                            type="textarea" />
                          </InputGroup>
                        </FormGroup>
                                                </Col>
                                                <Button
                            className="my-4"
                            color="success"
                            type="button" 
                            onClick={this.comentar}              
                          >
                            Comentar
                          </Button>
                                                </Row>
                                            </div>
                                            
                                            <div className="mt-5 py-5 border-top text-center">
                                            {this.state.comentarios.map(
                                              (item, i) => 
                                                <Row className="justify-content-center">
                                                    <Col lg="12">
                                                <UncontrolledAlert color="success" toggle={false}>
                                                  <span className="alert-inner--text ml-1">
                                                    <strong>{item.username} : </strong> {item.comentario}  {item.created_at}
                                                  </span>
                                                </UncontrolledAlert>
                                                </Col>
                                                </Row>
                                                )}
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