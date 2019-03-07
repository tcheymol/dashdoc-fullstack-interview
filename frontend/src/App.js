import React, {Component} from "react";
import "./App.css";

import GifsList from './components/GifsList';

const API_BASE = "http://localhost:8000/api";
const GIFS_URL = API_BASE + "/gifs/";

const STATES = {
    ERROR: "error",
    LOADING: "loading",
    NO_RESULTS: "no_results",
    LOADED: "loaded",
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {step: STATES.LOADING, gifs: [], page: 1};
    }

    componentDidMount = async () => {
        this.fetchGifs();
    };

    fetchGifs = async () => {
        if (this.state.page === null) {
            return;
        }

        try {
            const request = await fetch(`${GIFS_URL}?page=${this.state.page}`);
            const response = await request.json();

            const gifs = this.state.gifs.concat(response.results);
            this.setState({
                gifs: gifs,
                step: gifs.length === 0 ? STATES.NO_RESULTS : STATES.LOADED,
                page: response.next ? this.state.page + 1 : null,
            });
        } catch (err) {
            this.setState({step: STATES.ERROR, gifs: [], errorMessage: err.toString()});
        }
    };

    renderLoading = () => {
        return (
            <div className="loading">
                Loading...
                <div className="loading-icon">
                    <span role="img" aria-label="hourglass">
                        ⏳
                    </span>
                </div>
            </div>
        );
    };

    renderError = () => {
        return (
            <div className="error-box">
                <div className="error-box-title">Uh oh, an error occurred</div>
                <div className="error-box-message"> {this.state.errorMessage}</div>
            </div>
        );
    };

    renderNoResults = () => {
        return <div className="no-results">No gifs found, try fetching from Giphy</div>;
    };

    render() {
        return (
            <React.Fragment>
                <header className="header">
                    <div className="header-inner">
                        <div className="header-title">
                            <span role="img" aria-label="truck-logo">
                                🚚
                            </span>
                            Truckfinder
                        </div>
                        <div className="header-buttons">
                            <button>Log in</button>
                        </div>
                    </div>
                </header>
                <div className="app">
                    {this.state.step === STATES.LOADING && this.renderLoading()}
                    {this.state.step === STATES.LOADED && <GifsList gifs={this.state.gifs} page={this.state.page} fetchGifs={this.fetchGifs}/>}
                    {this.state.step === STATES.ERROR && this.renderError()}
                    {this.state.step === STATES.NO_RESULTS && this.renderNoResults()}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
