import React from "react";

const renderGif = gif => (
    <div className="gif" key={gif.slug}>
        <div className="gif-title">{gif.title}</div>
        <video autoPlay="autoplay" loop muted>
            <source src={gif.mp4} />
        </video>
    </div>
);


class Gifs extends React.Component {
    state = {
        searchText: '',
    };

    handleLoadMoreClick = (event) => {
        event.preventDefault();
        this.props.fetchGifs();
    };

    updateSearchText = (event) => {
        this.setState({searchText: event.target.value});
    };

    render() {
        const { gifs, page } = this.props;
        const { searchText } = this.state;
        const filteredGifs = gifs.filter((gif) => gif.title.includes(searchText));
        return(
             <React.Fragment>
                <div>
                    <span>Search gifs</span>
                    <input onChange={this.updateSearchText} type="text" name="searchText" value={searchText} />
                </div>
                <div className="gif-list">{filteredGifs.map(renderGif)}</div>
                {page !== null && (
                    <div className="gif-list-load-more">
                        <button onClick={this.handleLoadMoreClick}>Load more!</button>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Gifs;
