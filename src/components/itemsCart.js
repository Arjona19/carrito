//import React from "react";
import React from 'react';
import {
    UncontrolledAlert,
    Badge
  } from "reactstrap";

class itemsCart extends React.Component{  

    constructor(props){
        super(props);
        this.state = {status:false}
    }

    _deleteToCart(event){
        let _id = event.target.id;
        let arrayTemp = JSON.parse(localStorage.cart);
        let product = arrayTemp[_id];
        arrayTemp.pop(product);
        localStorage.cart = JSON.stringify(arrayTemp);
    }

    componentDidMount(){
        if (this.props.cart !== undefined) {
            this.setState({status:true})
        }
        
        if(this.props.cart === []){
            this.setState({status:false})
        }
    }

    render(){
        if (this.state.status) {
            return (
            <>
            {this.props.cart.map(
                          (item, i)=>
                            <UncontrolledAlert key={item.ID}  toggle={false} className="alert-default"  fade={true}>
                              <span className="alert-inner--icon">
                                <i className="ni ni-book-bookmark" />
                              </span>
                              <span className="alert-inner--text">
                              {item.titulo}
                              </span>
                              {"  "}
                              <Badge color="primary" pill className="mr-1">
                                <span className="btn-inner--icon">
                                    <i className="fa fa-user-circle mr-2" />
                                </span>
                                {item.autor}
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                               < span className="btn-inner--icon">
                                    <i className="fa fa-money mr-2" />
                                </span>
                               $ {item.precio}.00
                            </Badge> 
                            <Badge href="/products-page" id={i} onClick={this._deleteToCart.bind()} color="danger" pill className="mr-1">
                               Quitar del carrito
                            </Badge>   
                            </UncontrolledAlert>
                        )}
            </>);
        }
        else{
            return (
            <>
                 <Badge color="success" pill className="mr-1">
                                <span className="btn-inner--icon">
                                    <i className="fa fa-money mr-2" />
                                </span>
                               No hay items
                 </Badge>
            </>);
        }
    }
}

export default itemsCart;