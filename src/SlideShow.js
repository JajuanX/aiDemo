import React, {Component} from 'react';
import './App.css';
import SpeechToText from 'speech-to-text';
import ImageGallery from 'react-image-gallery';

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
// const flickr = new Flickr({
//   api_key: "cc4d14d027f058faf001552a7822308e"
// });
// flickr.photos.search({
//   text: "red+panda"
// }, function(err, result) {
//   if(err) { throw new Error(err); }
//   // do something with result
// }

class FlickrApi extends Component {
  state = {
    newData: '',
    data: '',
    speech: '',
    photos: [],

  }

  componentWillMount () {
}
sendData = () => {
  fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cc4d14d027f058faf001552a7822308e&text=${this.state.newData}&format=json&nojsoncallback=1`)
  .then( res => res.json() )
  .then( analysis => {
    console.log(analysis);
    let photos = analysis.photos.photo
    this.setState({photos: photos })
  })
  .catch(err => console.log('What Happened',err))
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
            <h1>Find photos</h1>
            <div style={styles.box}>{this.state.data}</div>
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <input onChange={this.handleChange} value={this.state.newData} name="newData" type="text" placeholder="How do you feel?"/>
              <div>
                <button style={styles.button} type='submit'>Submit</button>
                <button style={styles.button} onClick={this.try} type='button'>Listen Up!</button>
              </div>
          </form>
          </div>
          <div className="imageContainer">
            { this.state.photos.map(function(photo, index){
              return <div><img height="200px" width="200px" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={index} alt={photo.id}></img></div>
            })}
          </div>
        </div>

      )
  }
}

export default FlickrApi
