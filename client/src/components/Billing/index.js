import React, { Component } from "react";
import PropTypes from "prop-types";
import StarIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Checkout from "../Stripe/checkout";
// import {fire} from '../Auth/firebaseConfig';

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2
    }
  }
});

/* Filled in wording & pricing for now.  I expect we will decide on 
exact wording later on */

const tiers = [
  {
    title: "Newbie",
    accountType: 1,
    price: "5",
    stripePlan: "plan_ErV25voxUOIHIx",
    description: ["1 indicator included", "Help documentation", "Email support"]
  },
  {
    title: "Investor",
    accountType: 2,
    subheader: "Most popular",
    price: "15",
    stripePlan: "plan_ErV34BlWhIuIU6",
    description: [
      "3 indicators included",
      "Help documentation",
      "Priority email support"
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "Pro",
    accountType: 3,
    price: "30",
    stripePlan: "plan_ErV3wBN0rpWNQ5",
    description: [
      "5 indicators included",
      "Help documentation",
      "Priority email support"
    ]
  }
];
class Pricing extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />

        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Pricing
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              component="p"
            >
              Pickem is a investor application that makes it easier to research
              stocks and make better investment decisions. Become a better
              investor today by picking one of our tiered plans below.
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-end">
            {tiers.map((
              tier // Pro card is full width at sm breakpoint
            ) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Pro" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={tier.title === "Investor" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    {tier.description.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}

                    <center>
                      <br />
                      {this.props.authenticated ? (
                        <Checkout
                          name={tier.title}
                          amount={tier.price}
                          accountType={tier.accountType}
                          stripePlan={tier.stripePlan}
                        />
                      ) : (
                        <Button
                          component={Link}
                          to={ROUTES.SIGNIN}
                          style={{ color: "white" }}
                          fullWidth
                          variant={tier.buttonVariant}
                          color="secondary"
                        >
                          Get Started
                        </Button>
                      )}
                    </center>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pricing);
