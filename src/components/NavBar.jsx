import React from 'react';

const NavBar = (props) => {
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-danger mb-4'>
            <div className='container-fluid'>
                <span className='navbar-brand'><b>Kniffel</b></span>

                <ul className='navbar-nav me-auto'>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(1)}
                        >
                            Einzelspieler
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(2)}
                        >
                            2 Spielern
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(3)}
                        >
                            3 Spielern
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(4)}
                        >
                            4 Spielern
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(5)}
                        >
                            5 Spielern
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-danger'
                            onClick={() => props.onChange(6)}
                        >
                            6 Spielern
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;