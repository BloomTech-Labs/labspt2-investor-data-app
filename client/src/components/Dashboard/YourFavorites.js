import React from 'react'
import axios from 'axios'
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
            search: ''
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
        {this.state.stocks.map(item => {
           return stock.push(item.symbol)
        })}
        this.setState({
            companies: Array.from(new Set(stock))
        }) 
    }
    

    render(){

        if(!this.state.companies.length){
             return "You currently have no favorites"
        }

           return (
               <div>
                            
                   <div>
                       <FavoriteStocks companies={this.state.companies} /> 
                   </div> 
               </div> 
           )
       }
    }

    export default YourFavorites




   