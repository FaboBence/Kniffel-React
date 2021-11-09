import React, { Component } from 'react';
import '../styles/Die.css';

class Die extends Component {
    render() {
        const { die, rolling } = this.props

        return (
            <img
                // Showing image of the die resembling the current value and selection status
                src={require(`../die-faces/die_${die.value}_${die.selected}.png`).default}
                alt={`${die.value}${die.selected ? ' Selected' : ''}`}
                className={`Die ${rolling && !die.selected && 'Die-shaking'}`} // Handling animation
                onClick={() => this.props.onSelect(die)} // Raising event to handleSelect
            />
        );
    }
}

export default Die;