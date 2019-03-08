import React from 'react';
import { connect } from "react-redux";
import  { fetchStocks }  from '../../actions/index';
import TickerBoard from './tickerBoard'

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
        <TickerBoard />
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
    mapStateToProps,{fetchStocks})(StockTicker);

  