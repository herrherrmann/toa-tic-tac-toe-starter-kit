import React from 'react';

export default class Lobby extends React.Component {
    render() {
        const { games, onJoin, onCreate } = this.props;
        return (
            <div>
                <h4>
                    Current Games
                </h4>
                <div className="info">
                    {!games.length ? 'No games found.' : ''}
                </div>
                <ul>
                    {games
                        .map(game => {
                            return <li key={game.gameUid}>
                                <a onClick={() => onJoin(game.gameUid)}>
                                    Game #{game.gameUid} (by {game.players[0]}, {game.status.type})
                                </a>
                            </li>
                        })
                    }
                </ul>
                <br />
                <button type="button" onClick={() => onCreate()}>
                    Create new Game
                </button>
            </div>
        );
    }

}