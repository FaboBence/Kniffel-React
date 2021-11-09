import React, { Component } from 'react';
import '../styles/RollDice.css';
import Die from './Die';

class RollDice extends Component {
    
    render() {
        return (
            <div className='RollDice'>
                {/* DICE */}
                <div className='RollDice-container'>
                    {this.props.dice.map(die => (
                        <Die
                            key={die.id}
                            die={die}
                            rolling={this.props.rolling}
                            onSelect={this.props.onSelect}
                        />))
                    }
                </div>

                {/* WÜRFELN button */}
                <button
                    onClick={this.props.onRoll}     
                    className={this.props.rolling ?
                        'btn btn-secondary m-2' : 'btn btn-primary m-2'}
                    disabled={this.props.rolling || this.props.rolls_left === 0}
                >
                    {this.props.rolling && <span className="spinner-border spinner-border-sm"></span>}
                    {this.props.rolling ? ' Im Gange' : 'Wurfeln!'}
                </button>

                {/* FERTIG button */}
                <button
                    onClick={this.props.onDone}
                    className={this.props.rolling ?
                        'btn btn-secondary btn-sm m-2' : 'btn btn-success btn-sm m-2'}
                    disabled={this.props.rolling || this.props.rolls_left === 3}
                >
                    {this.props.rolls_left === 0 ?
                        'Fertig' : `Fertig! (noch ${this.props.rolls_left} versuchen)`}
                </button>
            </div>
        );
    }
}

export default RollDice;