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
  slideShow : {
    width: '300px',
    textAlign: 'center',
    height: '300px',
    margin: '0 auto',
  }
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

class GiphyApi extends Component {
  state = {
    newData: '',
    data: '',
    speech: '',
    photos: [],
    giphys: []


  }

  componentWillMount () {

}
sendData = () => {
  fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.newData}&api_key=ANABqRo1kEKy8Qbgx3EJsXqv3REIq4QP&limit=10`)
  .then( res => res.json() )
  .then( analysis => {
    console.log("Trying to find photos",analysis.data[0].images.original.url);
    let giphs = analysis.data
    console.log(giphs);
    this.setState({giphys: giphs })
    this.slideShow()
  })
      .catch(err => console.log(err))


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
  slideShow = () => {
    let newArray = this.state.giphys.map((giphy)=> ({original: giphy.images.original.url}))
    console.log('here',newArray);
    this.setState({slideShow: newArray})
    }


render() {
return(
  <div className="fade">
          <div style={styles.container}>
            <h1>Find Giphys!</h1>
            <div style={styles.box}>{this.state.data}</div>
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <input onChange={this.handleChange} value={this.state.newData} name="newData" type="text" placeholder="How do you feel?"/>
              <div>
                <button style={styles.button} type='submit'>Submit</button>
                <button style={styles.button} onClick={this.try} type='button'>Listen Up!</button>
              </div>
          </form>
          </div>
          <div style={styles.slideShow}>
            <ImageGallery height='300px' width='300px' items={this.state.slideShow} showPlayButton={false} showFullscreenButton={false} showThumbnails={true} thumbnailPosition='bottom' autoPlay={true}/>
          </div>
          <div className="imageContainer">
            { this.state.giphys.map(function(giphy, index){
              return <div className="giphTiles"><img src={giphy.images.original.url} height="100px" key={index} alt="Random Giphy"/></div>
            })}
          </div>
        </div>

      )
  }
}

export default GiphyApi
