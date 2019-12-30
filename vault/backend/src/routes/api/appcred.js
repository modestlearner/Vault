const shortid = require('shortid')
const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const mongoose = require('mongoose')


const jwtVerify = require('../../middleware/jwtverify')
const vaultStatus = require('../../middleware/vaultStatus')
const TextDoc = require('../../models/TextDoc')
const KeyDoc = require('../../models/KeyDoc')
const config = require('../../configurations/config')

const encrypt = function(text, key) {
	let cipher = crypto.createCipher(config.dev.algorithm, key)
	let crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

const decrypt = function(cipher,key){
	let decipher = crypto.createDecipher(config.dev.algorithm,key)
	let dec = decipher.update(cipher,'hex','utf8')
	dec += decipher.final('utf8');
	return dec;

}

router.post('/gen',[jwtVerify,vaultStatus],async function(req, res) {
	const { credentials, owner, property } = req.body
	let machines = req.body.machines.split(',')
    let encryptKey = await shortid.generate()
	try {
		const isPresent = await TextDoc.findOne({
			$and: [
				{
					owner
				},
				{
					property
				}
			]
		})
		if (isPresent) {
			return res.status(403).json({ err: 'Key already exists', status: 403 })
		}
		const toBeUpdated = await TextDoc.findOne({secret:req.body.secretKey})
		let encrypted = encrypt(credentials, encryptKey)
		if(toBeUpdated){
			await TextDoc.findOneAndUpdate(
				{secret:req.body.secretKey},
				{$set:{encrypted,machines}},
				{new:true}
			)
			await KeyDoc.findOneAndUpdate(
				{_id:req.body.secretKey},
				{$set:{encryptionkey:encryptKey}},
				{new:true}
			)
			return res.json({msg:"Info updated sucessfully",secretKey:req.body.secretKey})
		}
		let textdata = new TextDoc({
			owner,
			property,
			machines,
			encrypted
		})
		let keydata = new KeyDoc({
			encryptionkey: encryptKey
		})
		await keydata.save()
		textdata.secret = keydata._id
		await textdata.save()
		return res.json({ msg: 'Saved', secretKey: keydata._id })
	} catch (err) {
		console.log(err)
		return res.status(503).json({ err: 'Server error', status: 503 })
	}
})

router.post('/update',[jwtVerify,vaultStatus],async function(req,res){
	const secretKey = req.body.secretKey
	if (!mongoose.Types.ObjectId.isValid(secretKey)){
		return res.status(403).json({err:"Invalid key",status:403})
	}
	try{
		const text = await TextDoc.findOne({secret:secretKey})
		const key = await KeyDoc.findById(secretKey)
		if(!text || !key){
			return res.status(403).json({err:"No data associated with this key",status:403})
		}
		const cred = decrypt(text["encrypted"],key["encryptionkey"])
	
		return res.json({credentials:cred,owner:text.owner,property:text.property,machines:text.machines})

	}catch(err){
		console.log(err)
		return res.status(503).json({ err: 'Server error', status: 503 })
	}
})

module.exports = router
