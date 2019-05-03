import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import FavoriteStocks from "./FavoriteStocks";
import firebase from "firebase";
const URL = "https://pickemm.herokuapp.com/api";
// const URL = "http://localhost:5000/api";
class YourFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: [], // stock company symbols
      stocks: [],
      uid: "",
      search: ''
    };
  }

  componentDidMount() {
    let uid = firebase.auth().currentUser.uid;
    this.setState({
      uid: uid
    });
    this.fetchUserStocks(uid);
  }

  fetchUserStocks = uid => {
    axios
      .get(`${URL}/favorites`) // <----user favorites
      .then(response => {
        let stock = [];
        response.data.forEach((item, index) => {
          if (item.uid === uid) {
            stock.push(item.symbol);
          }
        });
        this.setState({
          stocks: stock
        });
        this.stockHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  stockHandler = () => {
    let stock = [];
    {
      this.state.stocks.map(item => {
        return stock.push(item);
      });
    }
    this.setState({
      companies: Array.from(new Set(stock))
    });
  };

    render(){
        if(!this.state.companies.length){
             return "You currently have no favorites"
        }
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          My Favorite Stocks
        </Typography>
        {""}
        <div>
          <FavoriteStocks companies={this.state.companies} />
        </div>
      </div>
    );
  }
}

export default YourFavorites;
