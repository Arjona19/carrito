import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Hero from "./IndexSections/Hero.js";

class Index extends React.Component {

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
          <Hero />
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
