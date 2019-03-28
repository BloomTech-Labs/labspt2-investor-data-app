import React from 'react'
import axios from 'axios'

class TickerStar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: false,
            star: 'far fa-star',
            user_id: null,
            stock: []
        }
    }

    componentDidMount() {
        axios.get(`https://pickemm.herokuapp.com/api/favorites`) // needs a user id
            .then( response => {
                this.setState({
                    stock: response.data
                })
            })
            .catch( error => { console.log( 'there was an error')})
    }

    selectHandler = (event) => {
        event.preventDefault(); 
        if(this.state.selected === false){
            this.setState({
                selected: true,
                star: 'fa fa-star',
            })  
            const newSymbol = {
                id: 17,
                symbol: this.props.id,
                target: 1,
                users_id: 15
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
        return(
            <div>
                <i onClick={this.selectHandler} className={this.state.star}></i>
            </div> 
        )
    }
}

export default TickerStar