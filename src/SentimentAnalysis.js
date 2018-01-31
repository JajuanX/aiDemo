import React, {Component} from 'react';
import './App.css';
import SpeechToText from 'speech-to-text';

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
    speech: '',

  }

  componentWillMount () {
    this.try()
}
sendData = () => {
  let { newData } = this.state
  let data = {newData}
  let statement = data.newData
  console.log('User says',statement);
  fetch('https://apiv2.indico.io/sentiment',
      {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({'api_key': "35bb681e6e1014958d47f3c4a796a647",
                                 'data': `"${statement}"`})
      })
      .then( res => res.json() )
      .then( analysis => {
        if(analysis.results < .2){
          this.setState({data: "That's a very negative thing to say!"})
        }
        else if (analysis.results < .4) {
          this.setState({data: "Your day will get better!"})
          }
        else if (analysis.results < .6) {
          this.setState({data: "Thats fairly positive of you!"})
        }
        else if (analysis.results < .8) {
          this.setState({data: "That's awesome, I hope your day continues to be positive!"})
        }
        else if (analysis.results < .999) {
          this.setState({data: "Wow! That's wonderful!"})
        }
        console.log(analysis)
        this.speakThis()
      })

}
speakThis = () => {
  let msg = new SpeechSynthesisUtterance()
  let voices = window.speechSynthesis.getVoices()
  msg.voice = voices[10]
  msg.voiceURI = 'native'
  msg.text = `"${this.state.data}"`
  window.speechSynthesis.speak(msg)
  msg.onend = function(e, props) {
    console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
    };
  console.log(msg);
}
  try  = () => {
    const onAnythingSaid = iSaid => console.log(`Interim text: ${iSaid}`)
    const onFinalised = iSaid =>{
      console.log(`Finalised text: ${iSaid}`)
      this.setState({newData: `${iSaid}`})
      this.sendData()
    }
    const onFinishedListening = () => {
      listener.stopListening()
      console.log('done listening');
    }

    const listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
    listener.startListening();
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
            <h1>How are you feeling?</h1>
            <div style={styles.box}>{this.state.data}</div>
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <input onChange={this.handleChange} value={this.state.newData} name="newData" type="text" placeholder="How do you feel?"/>
              <div>
                <button style={styles.button} type='submit'>Submit</button>
                <button style={styles.button} onClick={this.try} type='button'>Listen Up!</button>

              </div>
          </form>
          </div>
        </div>

      )
  }
}

export default SentimentAnalysis
