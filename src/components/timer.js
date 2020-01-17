const React = require('react')
const ms = require('pretty-ms')
class Timer extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      time: 0,
      isOn: false,
      start: 0
    };

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }
  create(){
   fetch("api/logs/",{method:'POST'})
  }
  update(){
   fetch("api/logs/",{method:'PUT'})
  }
  startTimer() {

    this.create();
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time

    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);


}
  stopTimer() {
    this.update();
    this.setState({isOn: false})
    clearInterval(this.timer)
    this.setState({time: 0, isOn: false})
    
  }
  
  render() {
    let start = (this.state.time === 0) ?
      <button className="btn btn-lg btn-info" onClick={this.startTimer}>Start</button> :
      null
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button className="btn btn-lg btn-danger" onClick={this.stopTimer}>Stop</button>
 
 
    return(
      <div>
       <h1>{ms(this.state.time)}</h1>
        
        {start}
        {stop}

      </div>
    )
  }
}
module.exports = Timer