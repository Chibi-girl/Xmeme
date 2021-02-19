const Meme = require('./model')
const isImageUrl = require('is-image-url');
const {check,validation}= require('express-validator');
const isUrl= require('is-url');


createMeme = async (req, res) => {																//method to post meme
	await Meme.find({}, {} , {sort: {'createdAt' :  -1 }}, (err, data) => {
    	if (err) {
            return res.status(404).json({ success: false, error: err })
        }
       	if (!req.body) {
        return res.status(400).json({																//bad request error sent
            success: false,
            error: 'YOU MUST provide a meme',
        });
        }
        let setid;
       	data.length===0?setid=1:setid=data[0].id+1;										//sets id 1 for the very first entry, or id of last entry+1 is used
    	let obj={id:setid,name:req.body.name,caption:req.body.caption,url:req.body.url};
    	let meme = new Meme(obj);																	//mapping the request body to the Schema
    	if (!meme){
        return res.status(400).json({ success: false, error: "Schema failed" })
    	}
    	if( !isUrl(meme.url) || !isImageUrl(meme.url))										//checking if url provided is a valid image url
    	{
    	return res.status(400).json({ error: "Not a valid image url or not a valid url" });
    	}
    	meme
        .save()																										//if meme is saved successfully, retur a created status
        .then(() => {
            return res.status(201).json({
                id: meme.id
            })
        })
        .catch(error => {
            return res.status(404).json({message: 'Meme not created!',})
        })
	}).limit(1).catch(err => console.log(err))													//grabbing the last meme by limiting entries to 1
}



updateMeme = async (req, res) => {															//implementation of patch method
    let body = req.body;
    if (!body) {
        return res.status(400).json({																//must have a non-empty body for updating
            success: false,
            error: 'You must provide a body to update',
        })
    }
    const id = req.params.id;
    Meme.findOneAndUpdate({id:id}, body, { useFindAndModify: false })
    .then(data => {																							
      if (!data) {																								//if meme doesn't exist with given id, display error
        res.status(404).send({
          message: `Cannot update Meme with id=${id}. Maybe Meme was not found!`
        });
      } else {
      console.log(data);																				
      res.status(201).send({ message: "Meme was updated successfully." })}
    })
    .catch(err => {
      res.status(404).send({message: "Error updating Meme with id=" + id});
    });
}



getMemeById = async (req, res) => {																//implementation of delete method
	const id=req.params.id;
    await Meme.findOne({id:id}, (err, meme) => {
        if (err) {
            return res.status(400).json({ success: false, error: 'id should be valid number' })
        }

        if (!meme) {																								//if given id doesn't exist, show error. Else display the meme details.
            return res
                .status(404)
                .json({ success: false, error: `Meme not found` })
        }
        return res.status(200).json({id : meme.id, name:meme.name, caption:meme.caption, url:meme.url });
    }).catch(err => console.log(err))
}



deleteMeme = async (req, res) => {
    	await Meme.remove({ id: req.params.id }, (err, meme) => {					//using remove method to find meme using id and deleting it
        if (err) {
            return res.status(400).json({ success: false, error:'id should be valid number' })
        }
        if (!meme) {																											
            return res
                .status(404)
                .json({ success: false, error: `Meme not found` })
        }
        return res.status(200).json({ success: true, data: meme })				//returns the meme data that got deleted
    }).catch(err => console.log(err))
}



getMemes = async (req, res) => {
    await Meme.find({}, {} , {sort: {'createdAt' :  -1 }}, (err, memes) => {	//fetching list of memes, the last created at first uding sort
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!memes.length) {
            return res
                .status(200)
            .send(memes.map(meme => ({															//an empty database simply returns an empty array
    id: meme.id,
  	name: meme.name,
  	caption: meme.caption,
  	url: meme.url,
	})))
        }
    else {
    return res.status(200).send( memes.map(meme => ({							//otherwise the list is sent, with the fields mapped accordingly
    id: meme.id,
  	name: meme.name,
  	caption: meme.caption,
  	url: meme.url,
	})) ) }
	}).limit(100).catch(err => console.log(err)) ;													//limit for limiting the list to 100 entries in case the database is huge
    	}



module.exports = {
    createMeme,
    updateMeme,
    deleteMeme,
    getMemes,
    getMemeById,
}
