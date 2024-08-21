import React from 'react';
import styles from './App.module.css'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
    return (
        <div className={styles.App}>

            <nav>
                <img src='media/logo-no-background.svg' alt='img' className={styles.logo}/>
            </nav>
            <header>
                <SearchBar/>
            </header>
            <main>
                <div className={styles.column1}>
                    <h2>Column with Search results</h2>
                    <SearchResults/>
                    <div>
                        
                    </div>
                </div>
                <div className={styles.column2}>
                    <input placeholder='Name the playlist' />
                    <div>
                    <h2>list of items selected</h2>
                    </div>
                    <button>Save playlist</button>
                </div>
            </main>
            <footer>
            <img src='media/logo-no-background.svg' alt='img' className={styles.logo}/>
            </footer>

        </div>
    );
}

export default App;
