const shortid = require('shortid')
const express = require('express')
const router = express.Router()
const crypto = require('crypto')

const jwtVerify = require('../../middleware/jwtverify')
const TextDoc = require('../../models/TextDoc')
const KeyDoc = require('../../models/KeyDoc')
const config = require('../../configurations/config')

const encrypt = function(text, key) {
	var cipher = crypto.createCipher(config.dev.algorithm, key)
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

router.post('/gen', async function(req, res) {
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
        let encrypted = await encrypt(credentials, encryptKey)
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

module.exports = router
