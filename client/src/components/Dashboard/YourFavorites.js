import React from 'react'
import axios from 'axios'
import { Input, Form, SearchIcon } from '../Styles/Dashboard/YourFavorites'
import FavoriteStocks from './FavoriteStocks'
import firebase from 'firebase'

class YourFavorites extends React.Component{
    constructor(){
        super();
        this.state = {
            timeStamp: {},
            companies: [], // stock company symbols
            stocks: [],
            items: [],
            uid: firebase.auth().currentUser.uid,

        }
    }
      
    componentDidMount(){
        axios.get(`http://www.localhost:5000/api/favorites/?uid=${this.state.uid}`) // <----user favorites
            .then( response => {
                this.setState({
                   stocks: response.data
                })  
                this.stockHandler()
            })
            .catch( err => {console.log( 'there was an error')})
    }
    
 stockHandler = () => {
     let stock = []
     {this.state.stocks.map( (item) => {
        return stock.push(item.symbol)
     })}
     this.setState({
         companies: stock
     })

     
 }

 render(){
     if(!this.state.companies.length){
          return "one moment"
     }
     

        return (
            <div>
                <Form> 
                    <SearchIcon><i className= 'fa fa-search' /></SearchIcon>
                    <Input type="text" placeholder="Search..."/> 
                </Form>          
                <div>
                 <FavoriteStocks companies={this.state.companies} /> 
                </div> 
            </div> 
        )
    }
}

export default YourFavorites