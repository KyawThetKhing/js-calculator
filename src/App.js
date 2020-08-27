import React from "react";

//import from local
import NumbersComponent from "./components/NumbersComponent";
import ClearComponent from "./components/ClearComponent";
import OperatorsComponent from "./components/OperatorsComponent";
import { numberList, operatorList } from "./constants";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: [],
      result: ""
    };
  }

  handleClick = e => {
    this.setState(
      {
        displayText: [...this.state.displayText, e]
      },
      () => this.handleValidation()
    );
  };

  handleValidation = () => {
    const { displayText } = this.state;
    //validate multiple zeros
    if (
      displayText[0].value === 0 &&
      displayText[1] &&
      displayText[1].value === 0
    ) {
      this.setState({
        displayText: displayText.splice(0, 1)
      });
    }

    //validate should only one decimals accept
    if (
      displayText.length > 2 &&
      displayText[displayText.length - 1].value === "." &&
      displayText[displayText.length - 2].value === "."
    ) {
      this.setState({
        displayText: [
          ...displayText.filter(value => value.id !== "decimal"),
          ...displayText.splice(displayText.length - 1)
        ]
      });
    }

    const allOperators = ["+", "-", "*", "/"];
    const operatorsExcludeMinus = ["+", "*", "/"];

    //validate two "." in one number should not be accepted
    if (displayText[displayText.length - 1].value === ".") {
      for (let i = displayText.length - 2; i >= 0; i--) {
        if (allOperators.includes(displayText[i].value)) {
          i = -1;
        } else {
          if (displayText[i].value === ".") {
            this.setState({
              displayText: [...displayText.slice(0, displayText.length - 1)]
            });
          }
        }
      }
    }

    //validate two or more consecutives operators
    if (
      operatorsExcludeMinus.includes(displayText[displayText.length - 1].value)
    ) {
      if (allOperators.includes(displayText[displayText.length - 2].value)) {
        if (allOperators.includes(displayText[displayText.length - 3].value)) {
          this.setState({
            displayText: [
              ...displayText.slice(0, displayText.length - 3),
              displayText[displayText.length - 1]
            ]
          });
        } else {
          this.setState({
            displayText: [
              ...displayText.slice(0, displayText.length - 2),
              displayText[displayText.length - 1]
            ]
          });
        }
      }
    }
    //validate when press equals
    if (displayText[displayText.length - 1].id === "equals") {
      this.handleCalculation();
    }
  };

  handleCalculation = e => {
    let element = document.getElementById("display").innerText;
    let temp;
    if (element.search("=") >= 0) {
      temp = element.slice(0, element.length - 1);
    } else {
      temp = element;
    }
    let result = eval(temp);
    const resultObj = {
      label: result,
      value: result,
      id: "result"
    };
    this.setState({
      displayText: [resultObj],
      result: result
    });
  };

  handleRemove = () => {
    this.setState({
      displayText: [],
      result: ""
    });
  };

  renderDisplay = () => {
    if (this.state.displayText.length > 0) {
      return this.state.displayText.map(calculateObj => {
        return calculateObj.value;
      });
    } else {
      return 0;
    }
  };
  render() {
    console.log("this.state", this.state.displayText);
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="text-display-div cal-div card bg-secondary">
              <div className="card-body">
                <span id="display">{this.renderDisplay()}</span>
              </div>
            </div>
            <div className="row">
              <div className="cal-pad col-md-8">
                <NumbersComponent
                  numberList={numberList}
                  handleClick={this.handleClick}
                />
                <ClearComponent handleRemove={this.handleRemove} />
              </div>
              <div className="cal-pad col-md-4">
                <OperatorsComponent
                  operatorList={operatorList}
                  handleClick={this.handleClick}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
