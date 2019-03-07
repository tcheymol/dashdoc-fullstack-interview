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
    handleLoadMoreClick = (event) => {
        event.preventDefault();
        this.props.fetchGifs();
    };

    render() {
        const { gifs, page } = this.props;
        return(
             <React.Fragment>
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
