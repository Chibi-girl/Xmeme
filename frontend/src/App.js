import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import {Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';  
import Update from './components/Update'
import Delete from './components/Delete'
let dotenv=require('dotenv')
const isImageUrl = require('is-image-url');
const isUrl= require('is-url');
dotenv.config()
class Upd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:false,show2:false};
  }
 showModal2= e => {																			//function for toggling show state of modal
 	this.setState({show2:!this.state.show2});
 }
 showModal= e => {
 	this.setState({show:!this.state.show});
} 	
render() 																	
{
	return (																								//renders the two buttons and associates them with a modal for showing and hiding
  		<div>
        <button onClick={e=>{this.showModal()}}>								//clicking toggles show state to true to display form for updating
			 Update Meme 
		 </button>
		 <Update memes={this.props.memes} onClose={this.showModal} show={this.state.show}/>
         <button onClick={e=>{this.showModal2()}}>							//toggles show state for confirm and delte buttons
			 Delete Meme 
		 </button>
         <Delete memes={this.props.memes} onClose={this.showModal2} show={this.state.show2}/>
      	 </div>																							//onClose function and corresponding meme sent as props to children 
    );
  }
}


class MemeList extends React.Component {									//the class that lists the mems
render()
{
    return (
        <div>
    	<h1>Meme Corner</h1>
    	<ul style={{listStyleType:"none"}}>											//using an unordered list
        	{ this.props.memes.length <=0?
        		'Make an entry to get the process going':
        		this.props.memes.map((meme) => (
        		<li style={{wordBreak:"break-all"}}  key={meme.id} id="lists">
        		 <p><strong >{meme.name}</strong></p>
        		 <p style={{padding:"10px 30px 10px 30px"}}>{meme.caption}</p>
        		<img src={meme.url} style={{maxHeight:"300px"}}/>
        		<Upd memes={meme}/>														//and passes flow to upd to show update and delete button
        		</li>
        		))}
    	</ul>
    	</div>
    	);
	}
}
      

class App extends React.Component {											//all the magic begins here
  constructor(props) {
   super(props);																						//setting state for input variables to empty
   this.state = {
      memes: [],
      name: '',
      caption:'',
      url:'',
      errormessage : ''};
  }
componentDidMount() {																		//after the initial render iscompleted, this function is executed to fetch meme list 
         axios.get(`http://localhost:8081/memes`)	//using a get request
		.then((res) => {
		this.setState({memes: res.data});												//and the array memes is filled
		},(error) =>{
		console.log(error);
		}); 
	}
mySubmitHandler = (event) => {															//the submit function gets invoked when form is submitted
		event.preventDefault();
		const { name,caption,url} = this.state;								
        axios(`http://localhost:8081.com/memes`, {			//and sends a post request with inputted parameters
				 "method": "POST",
				 "headers": {"content-type": "application/json"},
  				"data": JSON.stringify({name, caption, url,})
  				})
      	.then((response) => {
		 console.log(response);																	//and reloads page on successful submission
		 this.setState({errormessage : "Submitted meme successfully. Getting back to you in a couple of seconds",})
  		setTimeout(function(){window.location.reload();},3000);
		}, (error) => {
		console.log(error.message);																//or displays erroe message
    	this.setState({errormessage: "Not valid url or doesn't lead to an image."});
		})
	}
myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
render() {
	return (
    	<div>
    	<form  onSubmit={this.mySubmitHandler} >									//action set for clicking submit to calling mySubmitHandler function 
    	<div style={{height:"100%"}} className="ct">
      	<h1>XMEME CORNER</h1>
      	<p style={{height:"20px"}} id="heading">Username</p>
      	<input
        	type='text'
        	name='name'
        	placeholder='Enter your name'
        	required
        	onChange={this.myChangeHandler}
      	/>
      	<p id="heading">Enter a caption</p>													//the mandatory input fields
      	<input
        	type='text'
        	name='caption'
        	placeholder='Get creative. Or wild. '
        	required
        	onChange={this.myChangeHandler}
      	/>
      	<p id="heading">Enter url for image</p>
      	<input
        	type='text'
        	name='url'
        	placeholder='Enter a valid image url'
        	required
        	onChange={this.myChangeHandler}
      	/>
      	<p><strong>{this.state.errormessage}</strong></p>
      	<input type='submit' />
      	</div>
      	</form>
      	< MemeList memes={this.state.memes} />									//handing over flow to another class for listing memes
      	</div>
    );
  }
}

export default App; 
 
