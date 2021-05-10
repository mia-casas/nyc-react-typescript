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
                        {/* <img src={`http://www.nytimes.com/${article.multimedia[0].url}`}></img> */}
                        <p>{article.snippet}</p>
                    
                    </div>
                )
            })}
            

        </div>
    )
}

export default NYTResults