import React from 'react'
import axios from 'axios'
import { Input, Form, SearchIcon } from '../Styles/Dashboard/YourFavorites'
import FavoriteStocks from './FavoriteStocks'
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';
import firebase from 'firebase'

class YourFavorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timeStamp: {},
            companies: [], // stock company symbols
            stocks: [],
            uid: firebase.auth().currentUser.uid,
        }
    }
      
    componentDidMount(){
        this.props.getSettings(this.state.uid)
        if(!this.props.settings.id === null){
        return this.fetchUserStocks()
     }
    }
    fetchUserStocks = () => {
        axios.get(`http://www.localhost:5000/api/favorites/${this.props.settings.id}`) // <----user favorites
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
                   <Form> 
                       <SearchIcon><i className= 'fa fa-search' /></SearchIcon>
                       <Input id='search-bar' 
                              type="text" 
                              placeholder="Search..."/>              
                   </Form>          
                   <div>
                       <FavoriteStocks companies={this.state.companies} /> 
                   </div> 
               </div> 
           )
       }
    }

    const mapStateToProps = state => {
        return {
            fetchingSettings: state.SettingsReducer.fetchingSettings,
            error: state.SettingsReducer.error,
            settings: state.SettingsReducer.settings
        }
    };
    
    const mapDispatchToProps = dispatch => ({
        getSettings: (uid) => dispatch(getSettings(uid)),
        updateSettings:  (uid, updatedPhone) => dispatch(updateSettings(uid, updatedPhone))
    });
    
    export default (connect(mapStateToProps, mapDispatchToProps)(YourFavorites));
