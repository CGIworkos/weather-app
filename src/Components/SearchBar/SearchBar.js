import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="container searchBar">
          <input
            type="text"
            className="form-control"
            placeholder="City..."
            aria-label="City..."
            aria-describedby="button-addon2"
            onChange={this.handleTermChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={this.search}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;