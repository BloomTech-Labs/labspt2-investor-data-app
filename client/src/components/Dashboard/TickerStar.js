import React from 'react'
import axios from 'axios'


class TickerStar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: false,
            star: 'far fa-star',
            stock: [],
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
                target: 1,
                users_id: 10
            }
            axios.post('https://pickemm.herokuapp.com/api/favorites', newSymbol)
                .then( response => {
                    this.setState({
                        newSymbol: { symbol: '', target: null, users_id: null}
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
        return(
            <div>
                <i onClick={this.selectHandler} className={this.state.star}></i>
            </div> 
        )
    }
}

export default TickerStar