import React from "react";
import Indicators from "./dashDefinitions.json";
import {
  CharContainer,
  Character,
  DefContainer,
  Definitions,
  Term
} from "../Styles/Dashboard/KeyIndicators";
import { Typography } from "@material-ui/core";
class KeyIndicators extends React.Component {
  constructor() {
    super();
    this.state = {
      chars: Object.keys(Indicators),
      def: Indicators,
      id: "#"
    };
  }

  idHandler = char => {
    //sets chosen character to state so it can be used to collect definitions
    this.setState({
      id: char
    });
  };

  render() {
    return (
      <div>
        <CharContainer>
          <Typography variant="h6" gutterBottom>
            Glossary of Financial Terms
          </Typography>
          <div>
            {this.state.chars.map((char, index) => {
              //returns characters to create directory
              return (
                <Character
                  key={index}
                  onClick={() => {
                    this.idHandler(char);
                  }}
                >
                  {char}
                </Character>
              );
            })}
            <hr />
          </div>
        </CharContainer>
        <DefContainer>
          {this.state.def[this.state.id].map((item, index) => {
            //collects id of chosen character and returns definitions
            return (
              <Definitions key={index}>
                <Term>{item["term"]}</Term>
                {item["definition"]}
              </Definitions>
            );
          })}
        </DefContainer>
      </div>
    );
  }
}

export default KeyIndicators;
