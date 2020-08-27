import React, { Component } from "react";

class OperatorsComponent extends Component {
  render() {
    return (
      <div>
        {this.props.operatorList.map(operator => (
          <button
            key={operator.id}
            id={operator.id}
            onClick={e => this.props.handleClick(operator)}
            className="col-md-12 btn btn-default btn-outline-primary"
          >
            {operator.label}
          </button>
        ))}
      </div>
    );
  }
}

export default OperatorsComponent;
