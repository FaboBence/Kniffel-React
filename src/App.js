import React, { Component } from 'react';
import RollDice from './components/RollDice';
import ScoreTable from './components/ScoreTable';
import NavBar from './components/NavBar';

class App extends Component {
    static defaultProps = {
        sides: [1, 2, 3, 4, 5, 6],  // Sides of a die
        defSide: 5                  // Default side of dice
    }

    constructor(props) {
        super(props)
        this.state = {
            dice: [
                { id: 1, value: this.props.defSide, selected: 0 },
                { id: 2, value: this.props.defSide, selected: 0 },
                { id: 3, value: this.props.defSide, selected: 0 },
                { id: 4, value: this.props.defSide, selected: 0 },
                { id: 5, value: this.props.defSide, selected: 0 }
            ],
            rolling: false, // For handling animation
            rolls_left: 3,
            playerCount: 4, // How many players are in the game
            playerTurn: 1   // Which player's turn is it
        }
    } // Initialising state

    componentDidUpdate(prevProps, prevState) {
        if (this.state.rolls_left === 0 && prevState.rolls_left !== 0) {
            this.handleDone();
        }
    } // Using Hook to call "handleDone" after all rolls were done

    // Called when "Würfeln" button is clicked
    handleRoll = () => {
        this.setState({ rolling: true }); // Starting roll animation

        // Setting timer, to delay changes until dice roll animation stops
        setTimeout(() => {
            this.setState(({ dice, rolling, rolls_left }) => {
                dice.map(die => {
                    if (!die.selected) { // Die value changes only if it is NOT selected
                        die.value = 
                            this.props.sides[Math.floor(Math.random() * this.props.sides.length)];
                            // Random number generation
                    }
                    return die;
                });

                rolls_left--;       // Decrementing "rolls_left"
                rolling = false;    // Stopping rolling animation
                return { dice, rolling, rolls_left };
            });
        }, 1000);
    }

    handleSelect = die => {
        // State change only if allowed.
        if (!this.state.rolling && this.state.rolls_left < 3 && this.state.rolls_left > 0) {
            const dice = [...this.state.dice]
            const index = dice.indexOf(die);
            dice[index] = { ...die };

            // Bitwise XOR switches the selected property of a die from 0 -> 1 and from 1 -> 0
            dice[index].selected = dice[index].selected ^ true;
            this.setState({ dice });
        }
    } // Handles click on a die to select it

    handleDone = () => {
        this.setState(({ dice, rolls_left }) => {
            dice.map(die => {
                die.selected = 1;
                return die;
            }); // Setting all dice to "selected"

            rolls_left = 0; // Setting rolls_left to ZERO
            return { dice, rolls_left };
        });
    } // Called when "Fertig" button is clicked, or user is out of rolls.

    handleReset = fullReset => {
        this.setState(({ dice, rolls_left, playerCount, playerTurn}) => {
            dice.map(die => {
                die.value = this.props.defSide;
                die.selected = 0;
                return die;
            }); // Setting all dice to NOT selected with default value

            rolls_left = 3; // Setting rolls_left to default value
            if (fullReset || playerTurn === playerCount) playerTurn = 1;
            else playerTurn++;

            return { dice, rolls_left, playerTurn };
        });
    } // Handles the reset of RollDice component (doesn't clear points table)

    handlePlayerCount = count => {
        this.setState({ playerCount: count });
        this.handleReset(true);
    } // Handles the change of Player count (called from NavBar)

    render() {
        return (
            <React.Fragment>
                <NavBar // Navigation bar for user count selection
                    onChange={this.handlePlayerCount}
                />

                <div className='container'>
                    <RollDice // Responsible for dice and related buttons
                        dice={this.state.dice}
                        rolling={this.state.rolling}
                        rolls_left={this.state.rolls_left}
                        onRoll={this.handleRoll}
                        onSelect={this.handleSelect}
                        onDone={this.handleDone}
                    />

                    <ScoreTable // Handeling score calculation and presentation
                        dice={this.state.dice}
                        rolls_left={this.state.rolls_left}
                        playerCount={this.state.playerCount}
                        playerTurn={this.state.playerTurn}
                        onReset={this.handleReset}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
