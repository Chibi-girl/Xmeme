import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
const isImageUrl = require('is-image-url');
const isUrl= require('is-url');

class Update extends React.Component{
constructor(props) {
    super(props);
    this.state = {																			//sets everything to an empty string initially
      	caption:'',
      	url:'',
      	errormessage : ''};
  }
onClose= e => {																			//calls onClose method of the parent using props 
    this.props.onClose && this.props.onClose(e);
  };
  
  	mySubmitHandler = (event) => {
   	event.preventDefault();
	const  {caption,url}=this.state;
	if((!isUrl(url) || !isImageUrl(url)))											//checking for valid image url before updating....
    {
    	this.setState({errormessage: "Not valid url or doesn't lead to an image"});
    }
    else
    {																								//....if yes then patch method is sent to backend
        axios(`http://localhost:8081/memes/`+this.props.memes.id, {
				  "method": "PATCH",
				  "headers": {
					"content-type": "application/json"
  					},
  				"data": JSON.stringify({
              caption,url
  			})
			})
          .then((response) => {
 			 console.log(response);												//on success message is displayed and the page is reloaded
 			 this.setState({errormessage : "Updated meme successfully. Getting back to you in a couple of seconds"});
 			 setTimeout(function(){window.location.reload();},3000);
			}, (error) => {
  			console.log(error.message);
  			this.setState({errormessage: "Unable to update meme"});
			})
		}
     }
     
myChangeHandler = (event) => {											//keeps changing state as the input gets filled
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  
render(){
if(!this.props.show)	{	return null;	}										//if show is false then hide the form
  return (
  <div>
     
      <form  onSubmit={this.mySubmitHandler} >					//calls submit function on confirming submission
      <p id="heading">Enter a caption</p>
      <input
        type='text'
        name='caption'
        placeholder={this.state.caption}
        required
        onChange={this.myChangeHandler}
      />
      <p id="heading">Enter url for image</p>
      <input
        type='text'
        name='url'
        placeholder={this.state.url}
        required
        onChange={this.myChangeHandler}
      />
      <p><strong>{this.state.errormessage}</strong></p>//error message displayed if url is invalid
      <input type='submit' />
      </form>
      <div>
      <button onClick={e => {this.onClose(e);}}>
      Close
      </button>
      </div>
     </div>
  );
  }
}

export default Update;
