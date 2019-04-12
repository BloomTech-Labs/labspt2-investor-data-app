import React from 'react'
import axios from 'axios'
import firebase from 'firebase'

class TickerStar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: false,
            star: 'far fa-star',
            stock: [],
            uid: firebase.auth().currentUser.uid
        }
    }

    selectHandler = (event) => {
        event.preventDefault(); 
        if(this.state.selected === false){
            this.setState({
                selected: true,
                star: 'fa fa-star',
            })  
            const newSymbol = {
                symbol: this.props.id,
               // symbol: "MSFT",
               usersId: this.state.uid
            }
            console.log( "new symbol:", newSymbol)
            
            axios.post('http://localhost:5000/api/favorites', newSymbol)
          //  axios.post('https://pickemm.herokuapp.com/api/favorites', newSymbol)
                
            .then( response => {
                    this.setState({
                        newSymbol: { symbol: '', usersId: ""}
                    })
                })
                .catch( err => { console.log( "we've encountered an error")})
          } else {
                this.setState({
                    selected: false,
                    star: 'far fa-star'
                })
        }
    }

    render(){
        //firebase.auth().onAuthStateChanged( user => {
        //    if (user) { this.state.uid = user.uid }
        //  });
       console.log("uid:", this.state.uid)
        return(
            <div>
                <i onClick={this.selectHandler} className={this.state.star}></i>
            </div> 
        )
    }
}

export default TickerStar