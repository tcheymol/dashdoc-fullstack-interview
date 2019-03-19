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

    fetchGifs = async (search_text) => {
        try {
            let requestUrl = `${GIFS_URL}?page=${this.state.page}`;
            let currentGifsList = this.state.gifs;
            if (search_text) {
                requestUrl += `&search_text=${search_text}`
                currentGifsList = [];
            }
            const request = await fetch(requestUrl);
            const response = await request.json();

            const gifs = currentGifsList.concat(response.results);
            this.setState({
                gifs: gifs,
                step: gifs.length === 0 ? STATES.NO_RESULTS : STATES.LOADED,
                page: response.next ? this.state.page + 1 : 1,
            });
        } catch (err) {
            this.setState({step: STATES.ERROR, gifs: [], errorMessage: err.toString()});
        }
    };

    render() {
        return (
            <React.Fragment>
                <Header fetchGifs={this.fetchGifs} />
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
