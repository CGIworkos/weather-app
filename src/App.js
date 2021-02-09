import React, { Component } from "react";
import './App.css';
import weatherApi from "./util/weatherApi";
import SearchBar from "./Components/SearchBar/SearchBar";
import TodayData from "./Components/TodayData/TodayData";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: true,
      city: "",
      weekday: "",
      temp: "",
      weatherDescription: "",
      weatherIcon: "",
      country: "",
      timezone: "",
      time: "",
      forecast3hrs: [],
      forecastWeekly: []
    };
    this.search = this.search.bind(this);
  }

  updateTodayState = data => {
    this.setState(
      {
        firstTime: false,
        temp: data.temp,
        weatherDescription: data.weatherDescription,
        weatherIcon: data.weatherIcon,
        country: data.country,
        timezone: data.timezone,
        dateTime: data.dateTime,
        time: data.time,
        weekday: data.weekday,
        city: data.city
      },
      () => {}
    );
  };

  updateWeeklyState = data => {
    this.setState(
      {
        forecastWeekly: data,
        forecast3hrs: data.slice(0, 8)
      },
      () => {}
    );
  };

  search(term) {
    weatherApi.getTodayData(term).then(data => this.updateTodayState(data));
    weatherApi.get3HoursData(term).then(data => this.updateWeeklyState(data));
  }

  warningBanner() {
    if (this.state.firstTime) {
      return null;
    }

    return (
      <div className="warningBanner">
        We couldn’t find any results. Try checking your spelling.
      </div>
    );
  }

  displayResult() {
    if ((typeof this.state.city === "undefined") | (this.state.city === "")) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="main">
        <div className="navbar-main">
          <h1>Weather</h1>
        </div>
        <SearchBar onSearch={this.search} updateTerm={this.updateTerm} />
        {this.displayResult() ? (
          <TodayData
            city={this.state.city}
            country={this.state.country}
            temp={this.state.temp}
            time={this.state.time}
            weekday={this.state.weekday}
            weatherDescription={this.state.weatherDescription}
            weatherIcon={this.state.weatherIcon}
            forecast3hrs={this.state.forecast3hrs}
            forecastWeekly={this.state.forecastWeekly}
          />
        ) : (
          this.warningBanner()
        )}
      </div>
    );
  }
}

export default App;
