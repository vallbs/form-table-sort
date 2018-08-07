import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//custom
import Form from './Form/Form';
import Table from './Table/Table';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <Table />
      </div>
    );
  }
}

export default App;
