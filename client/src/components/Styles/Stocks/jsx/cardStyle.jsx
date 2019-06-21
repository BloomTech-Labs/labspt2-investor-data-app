import {
  blackColor,
  whiteColor,
  hexToRgb,
  purpleColor
} from "./dashboard-cards.jsx";

const cardStyle = {
  card: {
    borderTop: "5px solid rgba(" + hexToRgb(purpleColor) + ", 1)",
    marginTop: "8px",
    borderRadius: "2px",
    color: "rgba(" + hexToRgb(blackColor) + ", 1)",
    background: "rgba(" + hexToRgb(whiteColor) + ", 1)",
    minWidth: 305,
    height: 194,
    boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    wordWrap: "break-word",
    //fontSize: ".645rem",
    fontSize: "1rem",
    padding: "0 10px"
  },
  cardCategory: {
    //display: "flex",
    justifyContent: "flex-start",
    fontSize: ".71rem",
    marginRight: "6px"
  }
};

export default cardStyle;
