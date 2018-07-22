import { observable, decorate, action } from 'mobx';
import axios from 'axios';

class MoboquityStore {
  allRaces = [];

  allWinners = [];

  seasons = [];

  racesPerYear = [];

  winnerPerYear = '';

  loading = true;

  modal = false;

  fetchingData = () => {
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
          this.allRaces = allRaces;
          this.allWinners = allWinners;
          this.seasons = seasons;
          this.loading = false;
        })
      )
      .catch(error => {
        // handle error for any of both
        console.log(error);
      });
  };

  showRace = year => {
    const racesPerYear = this.allRaces.filter(element => element.season === `${year}`);
    const winnerPerYear = this.allWinners.filter(item => item.season === `${year}`)[0];
    this.racesPerYear = racesPerYear;
    this.winnerPerYear = winnerPerYear;
    this.modal = true;
  };

  closeModal = () => {
    this.modal = false;
  };
}

decorate(MoboquityStore, {
  allRaces: observable,
  allWinners: observable,
  seasons: observable,
  racesPerYear: observable,
  winnerPerYear: observable,
  loading: observable,
  modal: observable,
  fetchingData: action,
});

const store = new MoboquityStore();

export default store;
