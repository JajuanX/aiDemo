import React, {Component} from 'react'
import './App.css'
import SpeechToText from 'speech-to-text'
import {Redirect} from 'react-router-dom'

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
    mode: '',
    sentiment: false,
    image: false,
    politics: false,
    pictures: false,

  }

  componentWillMount () {
    this.speakMode()
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
  speakMode = () => {
    const onAnythingSaid = iSaid => console.log(`Interim text: ${iSaid}`)
    const onFinalised = iSaid =>{
      this.setState({mode: `${iSaid.toLowerCase()}`})
      console.log(`Finalised text: ${iSaid}`)
      this.setMode()
    }
    const onFinishedListening = (iSaid) => {
      listener.stopListening()
      console.log('done listening');
    }
    const listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
    listener.startListening();
}

  setMode = (e) => {
    if(this.state.mode.includes('sentiment analysis')){

      let msg = new SpeechSynthesisUtterance()
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[10]
      msg.voiceURI = 'native'
      msg.text = "Sentiment Analysis Activated"
      window.speechSynthesis.speak(msg)
      msg.onend = function(e) {
        console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
        };
      console.log('Sentiment Analysis Activated');
      this.setState({ sentiment : true })
    }
    else if(this.state.mode.includes('facial recognition')){
      let msg = new SpeechSynthesisUtterance()
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[10]
      msg.voiceURI = 'native'
      msg.text = "Please enter a URL in the text field"
      window.speechSynthesis.speak(msg)
      msg.onend = function(e) {
        console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
        };
      console.log('Facial Recognition Activated');
      this.setState({ image: true })
    }
    else if(this.state.mode.includes('politics')){
      let msg = new SpeechSynthesisUtterance()
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[10]
      msg.voiceURI = 'native'
      msg.text = "Politics it is"
      window.speechSynthesis.speak(msg)
      msg.onend = function(e) {
        console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
        };
      console.log('Politic Bot Activated');
      this.setState({ politics: true })
    }
    else if(this.state.mode.includes('stocks')){
      let msg = new SpeechSynthesisUtterance()
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[10]
      msg.voiceURI = 'native'
      msg.text = "Stocks it is"
      window.speechSynthesis.speak(msg)
      msg.onend = function(e) {
        console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
        };
      console.log('Stocks bot Activated');
      this.setState({ stocks: true })
    }
    else if(this.state.mode.includes('giph')){
      let msg = new SpeechSynthesisUtterance()
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[10]
      msg.voiceURI = 'native'
      msg.text = "Giphs it is"
      window.speechSynthesis.speak(msg)
      msg.onend = function(e) {
        console.log('Finished in ' + (e.elapsedTime/1000).toFixed(3) + ' seconds.');
        };
      console.log('Stocks bot Activated');
      this.setState({ stocks: true })
    }


  }

  try = () => {
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
    {this.state.sentiment ? <Redirect to="/sentimentanalysis" /> :
          <div style={styles.container}>
            <h1>What would you like to talk about?</h1>
            <div style={styles.box}>{this.state.data}</div>

          </div>
        }
        {this.state.image ? <Redirect to="/facialemotion" />: null }
        {this.state.politics ? <Redirect to="/politics" />: null }
        {this.state.pictures ? <Redirect to="/picturefinder" />: null }
        </div>

      )
  }
}

export default SentimentAnalysis
