import React from 'react';

export default class Game extends React.Component {
    render() {
        const {
            game,
            username,
            onMove,
            onLeave
        } = this.props;
        // const game = {
        //     gameUid: 'someId',
        //     players: ['max', 'moritz'],
        //     turn: 'moritz',
        //     board: [
        //         ['max', 'moritz', ''],
        //         ['', 'max', ''],
        //         ['', '', '']
        //     ],
        //     status: {
        //         type: 'ONGOING',
        //         winner: null
        //     }
        // };
        return (
            <div>
                <div className="info">
                    {getResult(game.status)}
                </div>
                {game.board.map((row, y) => {
                    return (
                        <div key={y} className="board-row">
                            {
                                row.map((col, x) => {
                                    const mark = getMark(col);
                                    const onClick = mark ? () => { } : () => onMove({ y, x });
                                    return (
                                        <div key={x} className="board-cell" onClick={onClick}>
                                            {mark}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                })}
                <h4>
                    Players:
                </h4>
                {game.players.map(player => {
                    const mark = getMark(player);
                    return (
                        <div key={player}>
                            {mark} {player}
                            {game.turn === player ?
                                ' (turn)' : ''
                            }
                        </div>
                    );
                })}
            </div>
        );

        function getMark(playerName) {
            let mark = '';
            if (game.players[0] === playerName) { mark = 'X'; }
            if (game.players[1] === playerName) { mark = 'O'; }
            return mark;
        }

        function getResult(gameStatus) {
            switch (gameStatus.type) {
                case 'FINISHED':
                    if (gameStatus.winner !== 'DRAW') {
                        return `${gameStatus.winner} won!`;
                    }
                    return 'Draw!';
                default:
                    return '';
            }
        }
    }
}