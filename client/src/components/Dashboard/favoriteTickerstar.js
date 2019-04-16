import React from 'react'
import axios from 'axios'
import firebase from 'firebase'


class FavoriteTickerstar extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            selected: true,
            star: 'fa fa-star',
            stocks: [],
            uid: firebase.auth().currentUser.uid,
            id: this.props.id
        }
    }


    componentDidMount(){
        axios.get(`http://www.localhost:5000/api/favorites/?uid=${this.state.uid}`) // <----user favorites
        .then( response => {
            this.setState({
               stocks: response.data
            })  
        })
        .catch( err => {console.log( 'there was an error')}) 
    }
    

    selectHandler = (event) => {
        event.preventDefault(); 
        if(this.state.selected === true){
            this.setState({
                selected: false,
                star: 'far fa-star',
            })  
            axios.delete(`http://www.localhost:5000/api/favorites/${this.state.id}`)
                .then( response => {
                    this.setState({
                        stocks: response.data
                    })
                    window.location.reload()
                })
                .catch( err => { console.log( "we've encountered an error")})
          } else {
                this.setState({
                    selected: true,
                    star: 'fa fa-star'
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

export default FavoriteTickerstar