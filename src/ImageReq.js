import React, {Component} from 'react';
import './App.css';
import Key from './config.json'


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

class ImageReq extends Component {
  state = {
    newData: '',
    data: {},
  }

  componentWillMount () {

}
sendData = () => {
  let { newData } = this.state
  let data = {newData}
  let statement = data.newData
  console.log('User Image is =>',statement);
  fetch('https://apiv2.indico.io/fer',
      {
        method: "POST",
        headers: {"content-type": "image/imagerecognition"},
        body: JSON.stringify({'api_key': `${Key[0].INDICO_KEY}`,
                                 'data': `${statement}`,
                                 'threshold': 0.01
                               })
      })
      .then( res => res.json() )
      .then( analysis => {
        console.log("response", analysis.results);
        this.setState({data: analysis.results})
        console.log(analysis)
        var obj = analysis.results
        var highest = 0;
        console.log(obj);
        for(var property in obj){
            if(obj[property] > highest){
                highest = obj[property];
            }
            console.log(highest);
            console.log(property);
        }
        this.setState({ newData:highest })
        });
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
            <h1>Image Recognition</h1>
            <div style={styles.box}>
              Angry: {this.state.data.Angry} <br/>
              Sad: {this.state.data.Sad} <br/>
              Neutral: {this.state.data.Neutral} <br/>
              Surprise: {this.state.data.Surprise} <br/>
              Fear: {this.state.data.Fear}
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

export default ImageReq
