import React from 'react';
import styles from './App.module.css'

function App() {
    return (
        <div className={styles.App}>

            <nav>
                <h2>logo only in navbar</h2>
                <img src='#' alt='img'/>
            </nav>
            <header>
                <h2>header - search box and search button - search form goes here</h2>
                <input placeholder='Enter Search query' />
                <button>Submit search query</button>
            </header>
            <main>
                <div className={styles.column1}>
                    <h2>Column with Search results</h2>
                </div>
                <div className={styles.column2}>
                    <h2>Column with items added by the user with the option to create playlist</h2>
                    <button>Save playlist</button>
                </div>
            </main>
            <footer>
                <h2>logo only will go here as a footer</h2>
            </footer>

        </div>
    );
}

export default App;
