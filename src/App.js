import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { MDBIcon } from "mdbreact";


class App extends Component {
  state={
    query:'',
    countries:[],
    search:[]
  }
  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const search = prevState.countries.filter(element => {
        return element.country.toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        search
      };
    });
  };
  getData = () =>{
    fetch('https://corona.lmao.ninja/countries?sort=%5Bproperty%5D')
    .then(response=>response.json())
    .then((countries)=>{
      const { query } = this.state;
      const search = countries.filter(element => {
        return element.country.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          countries,
          search           
      })
      
    })
  }
   
   
  componentDidMount(){
    this.getData();
  }
  
  render(){
    
  return (
    <div className="container">
      <div className="col-xs-12">
        <h1>Coronavirus Cases</h1>
        <div className="searchForm">
        <form>
          <input
            placeholder="Search for..." 
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
            {this.state.search.map((i)=>(
          <div class="card" >
            <div class="card-body">
              <h5 class="card-title">{i.country}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Cases: {i.cases}| Today:{i.todayCases}| Active:{i.cases-i.recovered-i.deaths} </h6>
              <h6 class="card-subtitle mb-2 text-muted">Deaths:{i.deaths}| Today:{i.todayDeaths}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Recovered:{i.recovered}| Critical:{i.critical}</h6>
            </div>
          </div>
        ))}   
            </div>
        </div>
        
      </div>
      );
  }
}

export default App;
