import { render } from '@testing-library/react';
import React, {MouseEvent} from 'react';
import NYTResults from './NYTResults';

type Features = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: any,
}

type URL = {
    base: string,
    key: string,
}

class NYTApp extends React.Component<{}, Features> {
    constructor(props:any){
    super(props);
    this.state = {
        search: '',
        startDate: '',
        endDate: '',
        pageNumber: 0,
        results: []
    }}

    fetchResults(){  // basic fetch wokring 
        let baseURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
        let key = `vDI3v9LNvpHBVwbvTgMn2CiKuFzNGWKs`
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`

        if (this.state.startDate !== '') url += `&begin_date${this.state.startDate}`;
        if (this.state.endDate !== '') url += `&begin_date${this.state.endDate}`;

        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({results: data.response.docs}))
        .catch(err => console.log(err))
        return console.log(this.state.results)
    }

    handleSubmit(event: any){
        this.setState({
            pageNumber: 0
        })
        this.fetchResults();
        event.preventDefault();
    }

    changePageNumber(event: MouseEvent, direction: string){
        event.preventDefault()
        if(direction === 'down'){
            if(this.state.pageNumber > 0){
                this.setState({pageNumber: this.state.pageNumber -1})
                this.fetchResults()
            }
        } if(direction === 'up'){
            this.setState({pageNumber: this.state.pageNumber +1})
            this.fetchResults()
        }
    }


    componentDidMount(){
        this.fetchResults()
    }
        
    render(){
        return(
            <div>
                <h1>NYT APP</h1>
                <h4>Version 3</h4>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <span>Enter a single search term (required): </span>
                    <input type="text" name="search" onChange={(event) => {this.setState({search: event.target.value})}} required />
                    <br />
                    <span>Enter a start date: </span>
                    <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(event) => {this.setState({startDate: event.target.value})}} />
                    <br />
                    <span>Enter an end date: </span>
                    <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(event) => {this.setState({endDate: event.target.value})}} />
                    <br />
                    <button className="submit">Submit Search</button>
                </form>
                {<NYTResults results={this.state.results} pages={this.changePageNumber}/>}
            
            <div>
                <button onClick={(e) => this.changePageNumber(e, 'down')}>Previous 10</button>
                <button onClick={(e) => this.changePageNumber(e, 'up')}>Next 10</button>
            </div>
            </div>
            
        )
    }

}

export default NYTApp