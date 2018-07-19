import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';

class App extends Component {
  state = {
    allRaces: [],
    allWinners: [],
    anyos: ['2005', '2006', '2007'],
    racesPerYear: [],
    winnerPerYear: '',
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
          this.setState({ allRaces, allWinners });
        })
      )
      .catch(error => {
        // handle error for any of both
        console.log(error);
      });
  }

  showRace = year => {
    const { allRaces, allWinners } = this.state;
    console.log(year);
    const racesPerYear = allRaces.filter(element => element.season === `${year}`);
    const winnerPerYear = allWinners.filter(item => item.season === `${year}`)[0].round;
    this.setState({ racesPerYear, winnerPerYear });
  };

  render() {
    const { allRaces, allWinners, anyos, racesPerYear, winnerPerYear } = this.state;
    console.log('allRaces', allRaces);
    console.log('allWinners', allWinners);

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
        <h1>React Mobiquity</h1>
        {anyos.map((item, i) => (
          <button key={i} type="button" onClick={() => this.showRace(item)}>
            {item}
          </button>
        ))}
        <ul>{<p>No race</p> && results}</ul>
      </div>
    );
  }
}

export default hot(module)(App);
