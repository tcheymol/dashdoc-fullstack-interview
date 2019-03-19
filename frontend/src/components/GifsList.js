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
        this.props.fetchGifs(event.target.value);
    };

    render() {
        const { gifs, page } = this.props;
        console.log('gifs page');
        console.log(gifs);
        const { searchText } = this.state;
        return(
             <React.Fragment>
                <div>
                    <span>Search gifs</span>
                    <input onChange={this.updateSearchText} type="text" name="searchText" value={searchText} />
                </div>
                <div className="gif-list">{gifs.map(renderGif)}</div>
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
