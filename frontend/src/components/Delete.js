import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
const isImageUrl = require('is-image-url');
const isUrl= require('is-url');
let dotenv=require('dotenv')
dotenv.config()

class Update extends React.Component{
constructor(props) {
    super(props);
    this.state = {errormessage : ''};
  }
onClose= e => {
    this.props.onClose && this.props.onClose(e);
};
mySubmitHandler = (event) => {										//method to submit a delete request wfich on successfully being completed reloads page
   	 axios(`http://localhost:8081/memes/`+this.props.memes.id, {"method": "DELETE",})
			.then((response) => {
 			 console.log(response);
 			 this.setState({errormessage : "Deleted meme successfully. Getting back to you in a couple of seconds"});
 			 setTimeout(function(){window.location.reload();},2000);
			}, (error) => {
  			this.setState({errormessage: "Not able to delete"});
			})
	}
render()																				//rendering a delete button which on being clicked submits confirmation for deletion
{
if(!this.props.show)	{	return null;		}							//if show is false, confirm and cancel buttons remain hidden
  return (
  <div>
      <p id="heading">Confirm delete?</p>
      <button onClick={e =>{this.mySubmitHandler(e)}}>
      	Yes
      	</button>
      <button onClick={e => {this.onClose(e);}}>
      Cancel
      </button>
      <p>{this.state.errormessage}</p>
      </div>
  );
  }
}

export default Update;
