import React, {Component} from 'react';
import './App.css';
import SpeechToText from 'speech-to-text';
import Key from './google.json';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >

    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
);
const MapWithATrafficLayer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBcW8fq_zKsFZ0eOw2krudoM5WR4z5FxTM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.9, lng: -87.624 }}
  >
    <TrafficLayer autoUpdate />
  </GoogleMap>
);

// Map with a Marker
// Just only Map

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

  }
// maps api AIzaSyBSyBx8NSyzLXHGUnMcQPhRPCBgL3GlSRs
// sendData = () => {
//   // let { newData } = this.state
//   // let data = {newData}
//   // let statement = data.newData
//   // console.log('User says',statement);
//   // console.log(Key.private_key_id);
//   // fetch("https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBSyBx8NSyzLXHGUnMcQPhRPCBgL3GlSRs")
//   //     .then( analysis => {
//   //       console.log(analysis);
//   //       this.setState({map: analysis})
//         // if(analysis.results < .2){
//         //   this.setState({data: "That's a very negative thing to say!"})
//         // }
//         // else if (analysis.results < .4) {
//         //   this.setState({data: "Your day will get better!"})
//         //   }
//         // else if (analysis.results < .6) {
//         //   this.setState({data: "Thats fairly positive of you!"})
//         // }
//         // else if (analysis.results < .8) {
//         //   this.setState({data: "That's awesome, I hope your day continues to be positive!"})
//         // }
//         // else if (analysis.results < .999) {
//         //   this.setState({data: "Wow! That's wonderful!"})
//         // }
//         // console.log(analysis)
//         // this.speakThis()
//       })
//
// }
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
                <button style={styles.button} type='submit'>Submit</button>
                <button style={styles.button} onClick={this.try} type='button'>Listen Up!</button>
                <div id="map">
                  <img src={this.state.map}></img>
                  <MapWithAMarker
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                  <MapWithATrafficLayer />

                </div>
              </div>
          </form>
          </div>
        </div>

      )
  }
}

export default SentimentAnalysis
