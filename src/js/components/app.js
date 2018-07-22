import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { Tooltip } from 'react-tippy';
import { observer, inject } from 'mobx-react';
import Aux from './hoc/aux';
import YearButton from './yearButton';
import Footer from './footer';
import Modal from './ui/modal';
import Standing from './standing';
import Flags from './flags';

class App extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static defaultProps = {
    store: {},
  };

  componentDidMount() {
    const { store } = this.props;
    store.fetchingData();
  }

  render() {
    const {
      store: { seasons, racesPerYear, winnerPerYear, showRace, loading, modal, closeModal },
    } = this.props;

    const yearButtons = seasons.map((item, i) => (
      <YearButton key={i} year={item} click={() => showRace(item)} />
    ));

    const results = racesPerYear.map((item, i) => {
      const winner = winnerPerYear.DriverStandings[0];
      return item.round !== winnerPerYear.round ? (
        <Standing key={i} item={item} />
      ) : (
        <Tooltip
          key={i}
          size="big"
          html={
            <div>
              On this season the winner was{' '}
              <strong>{`${winner.Driver.givenName} ${winner.Driver.familyName}`} </strong>
              with {winner.points} points in the round {winnerPerYear.round}
            </div>
          }
        >
          <Standing item={item} winnerPerYear={winnerPerYear} />
        </Tooltip>
      );
    });

    return (
      <Aux>
        <Modal status={modal} click={closeModal}>
          {results}
        </Modal>
        <header>
          <h1>React Mobiquity</h1>
        </header>
        <main>
          <ClipLoader color="#fff" size={100} loading={loading} />
          {yearButtons}
          <Flags />
        </main>
        <Footer />
      </Aux>
    );
  }
}

export default inject('store')(observer(App));
