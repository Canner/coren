import React, {Component} from 'react';
import {head, ssr, route} from 'coren';
import './style.scss';

@route('/')
@head({title: 'home', description: 'home description!!!!!'})
@ssr
export default class Root extends Component {
  handleClick() {
    console.log('hihi');
  }

  render() {
    return (
      <div>
        <h1 className="red">Click the button!!!</h1>
        <button className="hi" onClick={this.handleClick}>index file!</button>
      </div>
    );
  }
}
