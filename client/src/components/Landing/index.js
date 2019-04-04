import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import StockTicker from "../StockTicker";

import "../Styles/Landing/landing.css";

import undraw_investing from "./images/undraw_investing.png";
import undraw_finance from "./images/undraw_finance.png";
import undraw_financial_data from "./images/undraw_financial_data.png";

const Landing = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero__overlay hero__overlay--gradient" />
        <div className="hero__mask" />
        <div className="hero__inner">
          <div className="container">
            <div className="hero__content">
              <div className="hero__content__inner" id="navConverter">
                <h1 className="hero__title">
                  Automated system for analyzing key financial indicators
                </h1>
                <p className="hero__text">
                  Pick Em is a investor application that makes it easier to
                  research stocks and make better investment decisions. Our easy
                  to use app provides both beginner and sophisticated investors
                  with an automated system that analyzes key financial
                  indicators. Pick Em will allow the customer to determine
                  whether a buy signal is warranted.
                </p>
                <Link to={ROUTES.SIGNIN} className="button button__accent">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="steps landing__section">
        <div className="container">
          <h2>Who uses our application?</h2>
        </div>
        <div className="container">
          <div className="steps__inner">
            <div className="step">
              <div className="step__media">
                <img alt="" src={undraw_investing} className="step__image" />
              </div>
              <h4>Inexperienced Investors</h4>
              <p className="step__text">
                Don't have the time nor the knowledge to effectively analyze
                stock information to come to informed trading decisions.
              </p>
            </div>
            <div className="step">
              <div className="step__media">
                <img alt="" src={undraw_finance} className="step__image" />
              </div>
              <h4>Casual Traders</h4>
              <p className="step__text">
                Wants to keep track of a few favorite stocks and filter others
                based on specific technical indicators.
              </p>
            </div>
            <div className="step">
              <div className="step__media">
                <img
                  alt=""
                  src={undraw_financial_data}
                  className="step__image"
                />
              </div>
              <h4>Professional Investors</h4>
              <p className="step__text">
                Needs more in-depth investor services and comprehensive stock
                analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="expanded landing__section">
        <div className="container">
          <div className="expanded__inner">
            <StockTicker />
          </div>
        </div>
      </div>
      <div className="cta cta--reverse">
        <div className="container">
          <div className="cta__inner">
            <h2 className="cta__title">Get started now</h2>
            <p className="cta__sub cta__sub--center">
              Sign up to use Pick Em now.
            </p>
            <Link to={ROUTES.SIGNIN} className="button button__accent">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="footer footer--dark">
        <div className="container">
          <div className="footer__inner">
            <a href="index.html" className="footer__textLogo">
              PICKEM
            </a>
            <div className="footer__data">
              <div className="footer__data__item">
                <div className="footer__row">Created by:</div>
                <div className="footer__row">
                  <a href="https://github.com/iepoch" className="footer__link">
                    Stefan Clem
                  </a>
                </div>
                <div className="footer__row">
                  <a
                    href="https://github.com/willieino"
                    className="footer__link"
                  >
                    William Yturralde
                  </a>
                </div>
                <div className="footer__row">
                  <a
                    href="https://github.com/robsalzberg"
                    className="footer__link"
                  >
                    Rob Salzberg
                  </a>
                </div>
                <div className="footer__row">
                  <a
                    href="https://github.com/bcabanayan"
                    className="footer__link"
                  >
                    Bruce Cabanayan
                  </a>
                </div>
                <div className="footer__row">
                  <a
                    href="https://github.com/rlmclaughlin"
                    className="footer__link"
                  >
                    Ryan McLaughlin
                  </a>
                </div>
                <div className="footer__row">
                  <a href="https://github.com/cpdis" className="footer__link">
                    Colin Dismuke
                  </a>
                </div>
              </div>
              <div className="footer__data__item">
                <div className="footer__row">
                  <a
                    href="https://github.com/Lambda-School-Labs/labspt2-investor-data-app"
                    className="footer__link"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
