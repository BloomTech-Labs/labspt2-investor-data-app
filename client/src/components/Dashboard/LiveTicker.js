import React from 'react'
import axios from 'axios'
import TickerStar from './TickerStar'
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from "../Styles/Dashboard/styles";
//import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { Loading, Row, TickerContainer, StockSymbol, Star } from '../Styles/Dashboard/LiveTickerStyles'


class LiveTicker extends React.Component {
    constructor() {
        super();
        this.state = {
            timeStamp: {},
            companies: ['DJI', 'NDAQ', 'SPX', 'AAPL', 'AMZN'], // stock company symbols
            stocks: [],
            checked: false
        }
    }

    componentDidMount() {
        this.setState(state => ({ checked: !state.checked }));
        let promises = this.state.companies.map(company =>   // map that sends array of companies through axios to invoke external API
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&interval=5min&apikey=TFUONSVQ3ZDFXFPG`));
        this.fetchStocks(promises)
    }

    fetchStocks = (promises) => {  // Receives array of companies and returns values of the stock symbols from the api 
        let stocks = []
        let timeStamp
        axios
            .all(promises)
            .then(results => {
                results.forEach(result => {  // loops through keys to access targeted values of stock(s)

                    if (result.data.Note) {
                        throw new Error()
                    }

                    let data = result.data['Time Series (Daily)'] //Accesses correct object within API
                    let timeStamps = Object.keys(data)
                    let current = data[timeStamps[0]]
                    timeStamp = timeStamps[0]

                    stocks.push({
                        company: result.data['Meta Data']['2. Symbol'], // Collects stock symbol
                        values: current
                    })
                });

                this.setState({
                    stocks,
                    timeStamp
                });
            })
            .catch(error => {
                console.error('There was an error with the network requests', error)
            });
    }


    changePercent = (close, start) => {  // function for calculating the change of a stocks gain/loss by %
        let deduct = close - start
        let divide = deduct / start
        let solution = divide * 100
        if (solution > 0) {
            return "+" + solution.toFixed(2)
        }
        return solution.toFixed(2)
    }

    changePoints = (close, start) => {  // calculates the change of a stocks gain/loss by points
        let solution = close - start;
        if (solution > 0) {
            return "+" + solution.toFixed(1)
        }
        return solution.toFixed(1)
    }

    decimalToFixed = (input) => {  // truncates the numbers following the decimal to two digits 
        input = parseFloat(input).toFixed(2)
        return input
    }

    shortenVolume = (num) => {  // Crunches the length of the volume into a smaller number while inserting a decimal point and character representing the amount
        let str,
            suffix = '';

        let decimalPlaces = 2 || 0;

        num = +num;

        let factor = Math.pow(10, decimalPlaces);

        if (num < 1000) {
            str = num;
        } else if (num < 1000000) {
            str = Math.floor(num / (1000 / factor)) / factor;
            suffix = 'K';
        } else if (num < 1000000000) {
            str = Math.floor(num / (1000000 / factor)) / factor;
            suffix = 'M';
        } else if (num < 1000000000000) {
            str = Math.floor(num / (1000000000 / factor)) / factor;
            suffix = 'B';
        }
        return str + suffix;
    }

    stockHandler = (symbol) => {
        //using the current stock open the reports page
        console.log("symbol:", symbol)
    }

    render() {
        if (!this.state.stocks.length) {  // returns loading sign while data is being retrieved from API
            return <Loading>Loading Stocks...</Loading>
        }

        let rows = [];

        const open = '1. open'
        const close = '4. close'
        const volume = '5. volume'
        const { classes } = this.props;
        const { checked } = this.state;
        let x = 1000;

        this.state.stocks.forEach((stock, index) => {  // Loops through array of stock values and creates a table
            console.log(stock)
            rows.push(
             /*    <Slide direction="left" in={checked} mountOnEnter unmountOnExit key={index}> */
                 <Zoom in={checked} style={{ transitionDelay: checked ? '0ms' : '0ms' }} key={index}>
                    <Card className={classes.card} key={index}>
                        <CardContent>
                            <TickerContainer key={index}>
                                <Row>
                                    <StockSymbol>
                                        <p>{stock.company}</p>
                                    </StockSymbol>
                                    <Tooltip disableFocusListener title={
                                        <Typography color="inherit">Click here to Add/Remove stocks from your favorites</Typography>
                                    }>
                                        <Star>
                                            <TickerStar stocks={this.state.stocks} id={stock.company} />
                                        </Star>
                                    </Tooltip >
                                </Row>
                                <br />
                                <Row>
                                    <p>Price: ${`${this.decimalToFixed(stock.values[close])}`}</p>
                                    <p>Change: {`${this.changePoints(stock.values[close], stock.values[open])}`}</p>
                                </Row>
                                <Row>
                                    <p>Volume: {`${this.shortenVolume(stock.values[volume])}`}</p>
                                    <p>Change %: {`${this.changePercent(stock.values[close], stock.values[open])}`}</p>
                                </Row>
                            </TickerContainer>
                        </CardContent>
                        <CardActions>
                            <Tooltip disableFocusListener title={
                                <Typography color="inherit">Click here to view the Stock Indicator Charts</Typography>
                            }>
                                <Button size="small" onClick={() => this.stockHandler(stock.company)}>Open Report</Button></Tooltip >
                        </CardActions>

                    </Card>
                    </Zoom>
               /*  </Slide> */
            )
        });

        return (
            <div>
                {rows}
            </div>
        )
    }
}

export default withStyles(styles)(LiveTicker);