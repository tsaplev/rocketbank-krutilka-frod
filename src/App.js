import React, { Component } from 'react';
import hashScore from './hasher';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        phoneNumber: null,
        smsVerificationCode: null,
        token: null,
        hash: null
    }
  }

  getHash(scores) { 
    this.setState(prevState => ({...prevState, hash: hashScore(scores)}), () => {
      return this.state.hash;
    });
  }

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-6 col-md-4">
          <div className="form-group">
            <label>Кол-во очков:</label>
            <input type="number" className="form-control" onChange={(e) => {this.getHash(e.target.value)}}/>
          </div>
          <p>{this.state.hash}</p>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
