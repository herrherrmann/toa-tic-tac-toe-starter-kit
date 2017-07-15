import React from 'react';
import Lobby from './Lobby';
import Game from './Game';
import withTicTacToe from '../withTicTacToe';
import './style.css';

class TicTacToe extends React.Component {
  render() {
    const { game, games, isInGame, hasPendingGame, actions, username } = this.props;
    const { create, join, leave, move } = actions;
    return (
      <div>
        <h1>Hello, {username}!</h1>
        {isInGame ?
          <Game
            username={username}
            game={game}
            onMove={move}
            onLeave={leave}
          />
          :
          <Lobby
            games={games}
            onJoin={join}
            onCreate={create}
          />
        }
        {/* hasPendingGame: {hasPendingGame} */}
        {/* <p>
          <a href="https://github.com/TOA-Berlin-TicTacToe/toa-tic-tac-toe-starter-kit">Check out the instructions to get started!</a>
        </p> */}
      </div>
    );
  }
}

export default withTicTacToe(TicTacToe);
