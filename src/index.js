import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';
import Timer from './components/timer.js';
import Allresult from './components/table.js';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Allresult/>, document.getElementById('table-container'));
ReactDOM.render(<Timer/>, document.getElementById('timer-display'));

serviceWorker.unregister();
