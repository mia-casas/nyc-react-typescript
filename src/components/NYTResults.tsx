import React from 'react';

type MyProps = {
    results: Article[],
    pages: any
}

type Article = {
    headline: any,
    web_url: string,
    multimedia: any,
    snippet: string,
    keywords: [],
}

// type Result = {
//     key: number,
//     headline: string,
//     snippet: string,
// }

const NYTResults = (props: MyProps) => {
    return(
        <div>
            {props.results.map(article => {
                return (
                    <div>
                        <a href={article.web_url}><h3 >{article.headline.main}</h3></a>
                        <img alt="no image found" src={`http://www.nytimes.com/${article.multimedia[0].url}`} />
                        <p>{article.snippet}</p>
                    
                    </div>
                )
            })}
            <div>
                <button onClick={(e) => props.pages(e, 'down')}>Previous 10</button>
                <button onClick={(e) => props.pages(e, 'up')}>Next 10</button>
            </div>

        </div>
    )
}

export default NYTResults