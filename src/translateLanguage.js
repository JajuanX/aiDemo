import React, {Component} from 'react';
import './App.css';
import SpeechToText from 'speech-to-text';
import languages from './languages.json';
import Key from './config.json';

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
    map: []

  }

  componentWillMount () {
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${Key[3].YANDEX_KEY}&lang=es`)
    .then( res => res.json() )
    .then( analysis => {
      console.log(analysis.dirs)
      this.setState({langCodes: analysis.dirs})
    })
    .catch( err => console.log(err))
  }



// Translates some text into Russian


sendData = () => {
  let { newData } = this.state
  let data = {newData}
  let statement = data.newData
  console.log('User says',statement);
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${Key[3].YANDEX_KEY}&lang=es`,
      {
        method: "POST",
        headers: {"content-type": "application/x-www-form-urlencoded"},
        body: `text=${newData}`,

      })
      .then( res => res.json() )
      .then( analysis => {
        console.log(analysis.text)
        this.setState({transText: analysis.text})
      })
      .catch( err => console.log(err))
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
            <h1>Translator</h1>
            <div style={styles.box}>{this.state.data}</div>
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <input onChange={this.handleChange} value={this.state.newData} name="newData" type="text" placeholder="How do you feel?"/>
              <div>
                <select onChange={this.handleChange} name='language'>
                  {languages.map(function(languageOption, index) {
                    return <option value={languageOption.code} key={index}>{languageOption.language}</option>
                  })}
                </select>
                <button style={styles.button} type='submit'>Submit</button>
                <button style={styles.button} onClick={this.try} type='button'>Listen Up!</button>
                <div>
                  {this.state.transText}
                </div>
              </div>
          </form>
          </div>
        </div>

      )
  }
}

export default SentimentAnalysis
