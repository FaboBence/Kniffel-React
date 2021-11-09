import React, { Component } from 'react';

class ScoreTable extends Component {
    static defaultProps = {
        defaultScores: {
            'Einer':            [],
            'Zweier':           [],
            'Dreier':           [],
            'Vierer':           [],
            'Funfer':           [],
            'Sechser':          [],
            'Dreierpasch':      [],
            'Viererpasch':      [],
            'Full House':       [],
            'Kleine Strasse':   [],
            'Grosse Strasse':   [],
            'Kniffel':          [],
            'Chance':           [],
            'Summe oben':       [],
            'Bonus':            [],
            'Gesamt oben':      [],
            'Gesamt unten':     [],
            'Gesamtsumme':      []
        }
    }

    constructor(props) {
        super(props)
        let scores = { ...this.props.defaultScores };
        let keys = Object.keys(scores);
        
        for (let j = 0; j < keys.length; j++) {
            for (let i = 1; i < this.props.playerCount + 1; i++) {
                scores[keys[j]] = [ ...scores[keys[j]] ]; // Making a deep copy
                scores[keys[j]].push([i,'']); 
            }
        }

        this.state = {
            scores
            //scores: {
            //    'Einer':            [[1,''],[2,''],[3,'']],
            //    'Zweier':           [[1,''],[2,''],[3,'']],
            //    'Dreier':           [[1,''],[2,''],[3,'']],
            //    'Vierer':           [[1,''],[2,''],[3,'']],
            //    'Funfer':           [[1,''],[2,''],[3,'']],
            //    'Sechser':          [[1,''],[2,''],[3,'']],
            //    'Dreierpasch':      [[1,''],[2,''],[3,'']],
            //    'Viererpasch':      [[1,''],[2,''],[3,'']],
            //    'Full House':       [[1,''],[2,''],[3,'']],
            //    'Kleine Strasse':   [[1,''],[2,''],[3,'']],
            //    'Grosse Strasse':   [[1,''],[2,''],[3,'']],
            //    'Kniffel':          [[1,''],[2,''],[3,'']],
            //    'Chance':           [[1,''],[2,''],[3,'']],
            //    'Summe oben':       [[1,''],[2,''],[3,'']],
            //    'Bonus':            [[1,''],[2,''],[3,'']],
            //    'Gesamt oben':      [[1,''],[2,''],[3,'']],
            //    'Gesamt unten':     [[1,''],[2,''],[3,'']],
            //    'Gesamtsumme':      [[1,''],[2,''],[3,'']]
            //}
        }
    } // Initialising state

    componentDidUpdate(prevProps) {
        if (this.props.playerCount !== prevProps.playerCount) this.handleReset();
    } // Checking for update in playerCount

    handleReset = () => {
        let scores = { ...this.props.defaultScores };
        let keys = Object.keys(scores);

        for (let j = 0; j < keys.length; j++) {
            for (let i = 1; i < this.props.playerCount + 1; i++) {
                scores[keys[j]] = [...scores[keys[j]]]; // Making a deep copy
                scores[keys[j]].push([i, '']);
            }
        }
       
        this.setState({ scores });
    } // Resetting the points table

    compare(a,b) {
        if (a.value < b.value) return -1;
        else if (a.value > b.value) return 1;
        return 0;
    } // Helper function for sorting dice by value

    // Calculating points for the given row, that the user clicked.
    handleClick = (name, id) => {
        let points = 0;
        let dice = [...this.props.dice];
        for (let i = 0; i < dice.length; i++) {
            dice[i] = { ...dice[i] };
        } // Making a deep copy of dice
        dice.sort(this.compare); // Sorting dice in ascending order
        const top = ['Einer', 'Zweier', 'Dreier', 'Vierer', 'Funfer', 'Sechser'];

        if (top.includes(name)) {
            for (let die of dice) {
                if (die.value === top.indexOf(name) + 1) points += top.indexOf(name) + 1;
            }
        } // Einer ... Sechser points calculation
        else if (name === 'Dreierpasch') {
            // Searching for three dice with the same value
            // (dice are in ascending order, so dice with the same value are side-by-side)
            let prev = 0, i = 0, found = false;
            for (let die of dice) {
                points += die.value;
                if (prev === die.value) i++;
                else i = 1;
                if (i === 3) found = true;
                prev = die.value;
            }
            if (!found) points = 0;
        }
        else if (name === 'Viererpasch') {
            // Searching for four dice with the same value
            // (the same way as in Dreierpasch)
            let prev = 0, i = 0, found = false;
            for (let die of dice) {
                points += die.value;
                if (prev === die.value) i++;
                else i = 1;
                if (i === 4) found = true;
                prev = die.value;
            }
            if (!found) points = 0;
        }
        else if (name === 'Full House') {
            // Checking if three dice and two dice have the same value, but different ones
            // (a & b stores the same values, a_i & b_i counts how many were found from them)
            let a = 0, a_i = 1, b = 0, b_i = 1;

            for (let die of dice) {
                // Only have to store the first two different values, 
                // because a third different value would make a full house impossible.
                if (a === 0) { a = die.value; continue; }
                else if (b === 0 && a !== die.value) { b = die.value; continue; }

                if (die.value === a) a_i++;
                else if (die.value === b) b_i++;
            }
            if ((a_i === 2 && b_i === 3) || (a_i === 3 && b_i === 2)) points = 25;
            else points = 0;
        }
        else if (name === 'Kleine Strasse') {
            // Checking if there are at least four consecutive values among the five dice
            let prev = 0, i = 1, found = false;
            for (let die of dice) {
                if (prev === 0) prev = die.value;
                else if (die.value === prev + 1) i++;
                else if (die.value !== prev) i = 1;
                if (i === 4) found = true;
                prev = die.value;
            }
            if (found) points = 30;
            else points = 0;
        }
        else if (name === 'Grosse Strasse') {
            // Checking if all the five dice have consecutive values
            let prev = 0, i = 1, found = false;
            for (let die of dice) {
                if (prev === 0) prev = die.value;
                else if (die.value === prev + 1) i++;
                else i = 1;
                if (i === 5) found = true;
                prev = die.value;
            }
            if (found) points = 40;
            else points = 0;
        }
        else if (name === 'Kniffel') {
            // Checking if all five dice have the same value
            let prev = 0, found = true;
            for (let die of dice) {
                if (prev === 0) prev = die.value;
                else if (prev !== die.value) found = false;
            }
            if (found) points = 50;
            else points = 0;
        }
        else if (name === 'Chance') {
            // Adding up the values on the dice
            for (let die of dice) {
                points += die.value;
            }
        }

        // Saving points
        this.setState(({ scores }) => {
            scores[name][id][1] = points;
            return scores;
        },
            function () { this.updateSums() } // Calling updateSums in Callback
        );

        // Raising event to reset dice for next round
        this.props.onReset(false);
    }

    updateSums() {
        const entries = Object.entries(this.state.scores);
        
        this.setState(({ scores }) => {
            for (let j = 0; j < entries[0][1].length; j++) {
                let sum_oben = 0, bonus = 0, ges_oben = 0, ges_unten = 0, ges_summe = 0;

                for (let i = 0; i < 6; i++) {
                    sum_oben += (entries[i][1][j][1] === '' ? 0 : entries[i][1][j][1]);
                } // Summe oben

                if (sum_oben > 62) bonus = 35; // Bonus
                ges_oben = sum_oben + bonus; // Gesamt summe oben

                for (let i = 6; i < 13; i++) {
                    ges_unten += (entries[i][1][j][1] === '' ? 0 : entries[i][1][j][1]);
                } // Gesamt summe unten

                ges_summe = ges_oben + ges_unten; // Gesamt summe

                scores['Summe oben'][j][1] = sum_oben;
                scores['Bonus'][j][1] = bonus;
                scores['Gesamt oben'][j][1] = ges_oben;
                scores['Gesamt unten'][j][1] = ges_unten;
                scores['Gesamtsumme'][j][1] = ges_summe;
            }
            return scores;
        });
    } // Updating the Sums (oben, unten, bonus, endsumme)

    render() {
        const { scores } = this.state;

        return (
            <div className='container d-grid'>
                {/* Points table */}
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Spiel</th>
                            {Object.values(scores)[0].map((col) => {
                                return (
                                    <th key={col[0]} scope="col" className={ this.props.playerTurn === col[0] ? 'bg-warning':''}>
                                        {this.props.playerCount === 1 ? 'Punkten' : `#${col[0]} Punkten`}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/*Rows "Oben" */}
                        {Object.entries(scores).slice(0, 6).map((row) => {
                            return (
                                <tr key={row[0]}>
                                    <th scope="row">{row[0]}</th>
                                    {row[1].map((col) => { // Mapping columns
                                        return (
                                            <td
                                                key={col[0]}
                                                className={this.props.playerTurn === col[0] ? 'table-warning' : ''}
                                                onClick={() => {
                                                    if (col[1] === '' && this.props.rolls_left === 0 && this.props.playerTurn === col[0])
                                                    {
                                                        this.handleClick(row[0], col[0] - 1);
                                                    }
                                                }}
                                            >
                                                {col[1]}
                                            </td>)
                                    })}
                                </tr>);
                        })}

                        <tr className='table-active'>
                            <th scope="row">Summe oben</th>
                            {scores['Summe oben'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>
                        <tr className='table-active'>
                            <th scope="row">Bonus (ab 63)</th>
                            {scores['Bonus'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>
                        <tr className='table-active'>
                            <th scope="row">Gesamt oben</th>
                            {scores['Gesamt oben'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>

                        {/* Rows "Unten" */}
                        {Object.entries(scores).slice(6, 13).map((row) => {
                            return (
                                <tr key={row[0]}>
                                    <th scope="row">{row[0]}</th>
                                    {row[1].map((col) => { // Mapping columns
                                        return (
                                            <td
                                                key={col[0]}
                                                className={this.props.playerTurn === col[0] ? 'table-warning' : ''}
                                                onClick={() => {
                                                    if (col[1] === '' && this.props.rolls_left === 0 && this.props.playerTurn === col[0])
                                                    {
                                                        this.handleClick(row[0], col[0] - 1);
                                                    }
                                                }}
                                            >
                                                {col[1]}
                                            </td>)
                                    })}
                                </tr>);
                        })}

                        <tr className='table-active'>
                            <th scope="row">Gesamt unten</th>
                            {scores['Gesamt unten'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>
                        <tr className='table-active'>
                            <th scope="row">Gesamt oben</th>
                            {scores['Gesamt oben'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>
                        <tr className='table-danger'>
                            <th scope="row">Gesamtsumme</th>
                            {scores['Gesamtsumme'].map((col) => { return (<td key={col[0]}><b>{col[1]}</b></td>); })}
                        </tr>
                    </tbody>
                </table>

                {/* Reset button */}
                <button
                    className='btn btn-warning mt-2 mb-4'
                    onClick={() => {
                        this.handleReset();
                        this.props.onReset(true);
                    }}
                >
                    Reset
                </button>
            </div>
        );
    }

}

export default ScoreTable;