import React, {Component} from 'react';
import './App.css';

const styles = {
  container : {
    display: 'grid',
    gridTemplateColumns: '1fr',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '5px solid darkorange',
    width: '400px',
    margin: '0 auto',
    marginTop: '50px',
},
  box : {
    fontSize: '1.5rem',
    padding: '5px',

  },
  button : {
    fontSize: '1.5rem',
    borderRadius: '5px',
    backgroundColor: 'darkorange',
    width: '60%',
    margin: '0 auto',
    marginBottom: '10px'

  },
}

class StockAnalysis extends Component {
  state = {
    newData: '',
    data: '',
    analysis: []
  }

  componentWillMount () {
    this.getSymbols()
}

getSymbols = () => {
  fetch(`https://api.iextrading.com/1.0/ref-data/symbols`)
  .then( res => res.json() )
  .then( symbols => {
    console.log(symbols);
    // this.setState({analysis: })
  })
  .catch(err => console.log('What Happened',err))

}
sendData = () => {
    fetch(`https://api.iextrading.com/1.0/stock/${this.state.newData}/quote`)
    .then( res => res.json() )
    .then( analysis => {
      console.log(analysis);
      this.setState({analysis: analysis})
    })
    .catch(err => console.log('What Happened',err))
}
  handleChange = (e) => {
    // debugger { "description": "dslfjsdklfj"}
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
        newData: "",
    })
    console.log(e)
    this.sendData()
  }

render() {
return(
  <div className="fade">
          <div style={styles.container}>
            <h1>Stock Analysis</h1>
            <div style={styles.box}>
              Company Name: {this.state.analysis.companyName} <br/>
              Sector: {this.state.analysis.sector} <br/>
              52 Week High: {this.state.analysis.week52High} <br/>
              52 Week Low: {this.state.analysis.week52Low} <br/>
              Latest Price: {this.state.analysis.latestPrice}
            </div>
            <form onSubmit={this.handleSubmit} style={styles.form}>
              <div>
                <input onChange={this.handleChange} name="newData" type="text" placeholder="How do you feel?"/>
              </div>
              <div>
                <button style={styles.button} type='submit'>Submit</button>
              </div>
          </form>
          </div>
        </div>

      )
  }
}

export default StockAnalysis
