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

class SentimentAnalysis extends Component {
  state = {
    newData: '',
    data: '',
  }

  componentWillMount () {

}
sendData = () => {
  let { newData } = this.state
  let data = {newData}
  let statement = data.newData
  console.log('User says',statement);
  fetch('https://apiv2.indico.io/political',
      {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({'api_key': "35bb681e6e1014958d47f3c4a796a647",
                                 'data': `"${statement}"`})
      })
      .then( res => res.json() )
      .then( analysis => {
        this.setState({data: analysis.results})
        console.log(analysis.results.data)
      })
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
            <h1>Political</h1>
            <div style={styles.box}>
              Libertarian: {this.state.data.Libertarian} <br/>
              Green: {this.state.data.Green} <br/>
              Liberal: {this.state.data.Liberal} <br/>
              Conservative: {this.state.data.Conservative}
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

export default SentimentAnalysis
