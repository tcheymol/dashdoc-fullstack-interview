import React, {Component} from "react";
import "./App.css";

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

            this.setState({
                gifs: this.state.gifs.concat(response.results),
                step: STATES.LOADED,
                page: response.next ? this.state.page + 1 : null,
            });
        } catch (err) {
            this.setState({step: STATES.ERROR, gifs: [], errorMessage: err.toString()});
        }
    };

    handleLoadMoreClick = event => {
        event.preventDefault();
        this.fetchGifs();
    };

    renderGif = gif => {
        return (
            <div className="gif" key={gif.slug}>
                <div className="gif-title">{gif.title}</div>
                <video autoPlay="autoplay" loop muted>
                    <source src={gif.mp4} />
                </video>
            </div>
        );
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

    renderGifs = () => {
        return (
            <React.Fragment>
                <div className="gif-list">{this.state.gifs.map(this.renderGif)}</div>
                {this.state.page !== null && (
                    <div className="gif-list-load-more">
                        <button onClick={this.handleLoadMoreClick}>Load more!</button>
                    </div>
                )}
            </React.Fragment>
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
                    {this.state.step === STATES.LOADED && this.renderGifs()}
                    {this.state.step === STATES.ERROR && this.renderError()}
                    {this.state.step === STATES.NO_RESULTS && this.renderNoResults()}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
