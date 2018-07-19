import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import YearButton from './yearButton';
import Footer from './footer';

class App extends Component {
  state = {
    allRaces: [],
    allWinners: [],
    seasons: [],
    racesPerYear: [],
    winnerPerYear: '',
    loading: true,
  };

  componentDidMount() {
    axios
      .all([
        axios.get('http://ergast.com/api/f1/results/1.json?limit=204&offset=734'),
        axios.get('http://ergast.com/api/f1/driverStandings/1.json?limit=11&offset=55'),
      ])
      .then(
        axios.spread((allRacesRes, allWinnersRes) => {
          // spreading both responses
          const allRaces = allRacesRes.data.MRData.RaceTable.Races;
          const allWinners = allWinnersRes.data.MRData.StandingsTable.StandingsLists;
          const seasons = [...new Set(allRaces.map(element => element.season))];
          this.setState({ allRaces, allWinners, seasons, loading: false });
        })
      )
      .catch(error => {
        // handle error for any of both
        console.log(error);
      });
  }

  showRace = year => {
    const { allRaces, allWinners } = this.state;
    const racesPerYear = allRaces.filter(element => element.season === `${year}`);
    const winnerPerYear = allWinners.filter(item => item.season === `${year}`)[0].round;
    this.setState({ racesPerYear, winnerPerYear });
  };

  render() {
    const { seasons, racesPerYear, winnerPerYear, loading } = this.state;

    const yearButtons = seasons.map((item, i) => (
      <YearButton key={i} year={item} click={() => this.showRace(item)} />
    ));

    const results = racesPerYear.map(element => (
      <li key={element.round} className={element.round === winnerPerYear ? 'active' : ''}>
        <p>
          {element.round}{' '}
          <span>
            {element.Results[0].Driver.familyName} - {element.raceName}
          </span>
        </p>
      </li>
    ));

    return (
      <div>
        <header>
          <h1>React Mobiquity</h1>
        </header>
        <main>
          <ClipLoader color="#fff" size={100} loading={loading} />
          {yearButtons}
          <ul>{<p>No race</p> && results}</ul>
        </main>
        <Footer />
      </div>
    );
  }
}

export default hot(module)(App);
