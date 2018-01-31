import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Display from './Display.js';
import SentimentAnalysis from './SentimentAnalysis.js';
import FacialEmotion from './ImageReq.js';
import Politics from './Politics.js';
import Giphy from './Giphy.js';
import Pictures from './PictureFinder.js';
import StockAnalysis from './StockAnalysis.js';
import Translate from './translateLanguage.js';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <Route exact path='/' component={Display} />
            <Route path='/sentimentanalysis' component={SentimentAnalysis} />
            <Route path='/facialemotion' component={FacialEmotion} />
            <Route path='/politics' component={Politics} />
            <Route path='/picturefinder' component={Pictures} />
            <Route path='/giphy' component={Giphy} />
            <Route path='/stockanalysis' component={StockAnalysis} />
            <Route path='/translate' component={Translate} />

          </div>
        </Router>
    );
  }
}

export default App;
