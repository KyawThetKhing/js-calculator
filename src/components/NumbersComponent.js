import React, { Component } from "react";

class NumbersComponent extends Component {
  render() {
    return (
      <div>
        {this.props.numberList.map(number => (
          <button
            key={number.id}
            id={number.id}
            onClick={e => this.props.handleClick(number)}
            className="col-md-4 btn btn-default btn-outline-primary"
          >
            {number.label}
          </button>
        ))}
      </div>
    );
  }
}

export default NumbersComponent;
