import React from 'react';
import { connect } from "react-redux";
import  { fetchStocks }  from '../../actions/index';
import CustomizedTable from './tickerBoard'

class StockTicker extends React.Component {
   constructor(props){
     super(props)
   }

  componentDidMount(){
    this.props.fetchStocks('AMZN')
  }

  render() { 
    return (
      <div>
        <CustomizedTable />
      </div> 
    );
  }
}

const mapStateToProps = state => {
    return {
      stocks: state.stockTickerReducer.stocks,
      fetching: state.stockTickerReducer.fetching
    }
  }
  export default connect(
    mapStateToProps,
    {
      fetchStocks
    }
  )(StockTicker);

  