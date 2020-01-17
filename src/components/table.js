import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
 export default class Allresult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      id:null
    };
  }
    getData =() => {
   fetch("api/logs/",{method:'GET'})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });

        },
        // catch errors
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
}
deleteData(id){
  fetch("/api/logs/"+id,{
    method:'DELETE'})
   //alert(id);
}
  componentDidMount() {

      this.getData();
     setInterval(this.getData, 1000); // runs every 5 seconds.
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } 
    if(items.length != 0) {
      return (

      <table className="table table-dark">
      <thead><th>ID</th><th>Timestamp</th><th>Log type</th><th>Delete</th></thead>
          {items.map(item => (
            <tr className="small"> 
            <td> {item.id} </td> <td> {item.timestamp} </td><td> {item.log_type} </td>
            <td><Button onClick={this.deleteData.bind(this, item.id)} color="secondary" variant="outlined">delete</Button></td>
            </tr>
          ))}
        </table>
      );
    }else{
      return(
        <center><h4>No logs</h4></center>
      );
    }
  }
}
