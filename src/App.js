import React, { Component } from 'react';
import hashScore from './hasher';
import axios from 'axios';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        phoneNumber: null,
        smsVerificationCode: null,
        phoneCode: null,
        userToken: null,
        scoreHash: null
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.updateState('userToken', localStorage.getItem('token'));
    }
  }

  updateState(key, value, cb = null) {
    this.setState(prevState => ({...prevState, [key]: value}), cb);
  }

  getSmsVerificationCode(phoneNumber) {
    axios.post('https://rocketbank.ru/api/marketing/orders/rocketpowergame', { 'phone': phoneNumber }).then((res) => {
        if(res.data.sms_verification) {
          this.updateState('smsVerificationCode', res.data.sms_verification);
        } else {
          alert('Упс! Что-то пошло не так.');
        }
    });
  }

  getUserToken() {
    axios.patch('https://rocketbank.ru/api/marketing/orders/rocketpowergame/confirm', { 'sms_verification': this.state.smsVerificationCode, 'code': this.state.phoneCode }).then((res) => {
        if(res.data.token) {
          this.updateState('userToken', res.data.token, () => {
            localStorage.setItem('token', this.state.userToken);
          });
        } else {
          alert('Упс! Что-то пошло не так.');
        }
    });
  }

  saveScore() {
    axios.patch(`https://rocketbank.ru/api/marketing/orders/rocketpowergame/${this.state.userToken}/save_score`, {'score': this.state.scoreHash}).then((res) => {
        if(res.data.additional_attributes.cool_hacker === true) {
          return alert('Упс! Нас спалили 😢');
        }

        if(res.data.result === 'ok') {
          alert('😎');
        } else {
          alert('Упс! Что-то пошло не так.' + '\n' + `Сообщение от Рокетбанка: ${res.data.error}`);
        }
    });
  }

  handleSubmit(event, type) {
    event.preventDefault();
    switch (type) {
      case 'phone':
        this.updateState('phoneNumber', event.target.elements.phone.value, () => {
          this.getSmsVerificationCode(this.state.phoneNumber);
        });
        break;
      case 'code':
        this.updateState('phoneCode', event.target.elements.code.value, () => {
          this.getUserToken(this.state.smsVerificationCode, this.state.phoneCode);
        });
        break;
      case 'score':
        this.updateState('scoreHash', hashScore(event.target.elements.score.value), () => {
          this.saveScore();
        });
        break;
      default: 
        alert('Что-то пошло не так!');
        break;
    }
  }

  render() {
    return (
      <div className="App container">
      <div className="row">
        <div className="col-12 mx-auto">
          {
            !this.state.userToken && !this.state.phoneNumber &&  
            <form onSubmit={(e) => {this.handleSubmit(e, 'phone')}}>
              <div className="form-group">
                <label htmlFor="phone">Номер телефона</label>
                <input type="numbers" className="form-control" id="phone" name="phone" placeholder="+7 (000) 000-00-00"  mask="+7 (999) 999-99-99" required/>
              </div>
              <button type="submit" className="btn btn-primary btn-next">Дальше</button>
            </form>
          }

          {
            !this.state.userToken && this.state.phoneNumber && !this.state.userToken &&
            <form onSubmit={(e) => {this.handleSubmit(e, 'code')}}>
              <div className="form-group">
                <label htmlFor="code">Код из СМС</label>
                <input type="numbers" className="form-control" id="code" name="code" required/>
              </div>
              <button type="submit" className="btn btn-primary">Далее</button>
            </form>
          }

          {
            this.state.userToken && 
            <form onSubmit={(e) => {this.handleSubmit(e, 'score')}}>
              <div className="form-group">
                <label htmlFor="score">Кол-во очков:</label>
                <input type="number" max="99999999" className="form-control" id="score" name="score" placeholder="148822869" required/>
              </div>
              <button type="submit" className="btn btn-primary">Накрутить!</button>
            </form>
          }

          <p>{this.state.hash}</p>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
