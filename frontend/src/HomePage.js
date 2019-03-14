import React, {Component} from "react";
import "./App.css";

import GifsList from './components/GifsList';
import Loading from './components/Loading';
import Error from './components/Error';
import NoResult from './components/NoResult';
import Header from "./components/Header";

const API_BASE = "http://localhost:8000/api";
const GIFS_URL = API_BASE + "/gifs/";

const STATES = {
    ERROR: "error",
    LOADING: "loading",
    NO_RESULTS: "no_results",
    LOADED: "loaded",
};

class HomePage extends Component {
    state = {
        step: STATES.LOADING, gifs: [], page: 1
    };

    componentDidMount = () => {
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

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="app">
                    {this.state.step === STATES.LOADING && <Loading />}
                    {this.state.step === STATES.LOADED && <GifsList gifs={this.state.gifs} page={this.state.page} fetchGifs={this.fetchGifs}/>}
                    {this.state.step === STATES.ERROR && <Error errorMessage={this.state.errorMessage} />}
                    {this.state.step === STATES.NO_RESULTS && <NoResult />}
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;
