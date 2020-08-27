import React, { Component } from "react";

class ClearComponent extends Component {
  render() {
    return (
      <div>
        <button
          id="clear"
          onClick={this.props.handleRemove}
          className="col-md-12 btn btn-danger"
        >
          AC
        </button>
      </div>
    );
  }
}

export default ClearComponent;
