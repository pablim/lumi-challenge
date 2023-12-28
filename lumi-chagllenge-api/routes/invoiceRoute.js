import express from 'express'

import invoice from '../repository/invoice.js'
import getPDFText from "../utils/PDFReader.js";

const invoiceRoute = express.Router()

invoiceRoute.get('/get-client-numbers', async (req, res) => {
	let msgs = [];
	try {
		const result = await invoice.getClientNumbers()

		if (result.length > 0)
			msgs.push('Success')
		else msgs.push('No data to show')

		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		if (e.constructor.name == "DatabaseError")
			// When DatabaseError supress the details msg by security.
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

invoiceRoute.get('/get-by-client-number', async (req, res) => {
	let msgs = [];
	const { clientNumber } = req.query

	try {
		const result = await invoice.getByClientNumber({clientNumber})

		if (result.length > 0)
			msgs.push('Success')
		else msgs.push('No data to show')
		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

invoiceRoute.post('/import', async (req, res) => {
	let msgs = [];
	let PDFInfoArray = []

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	try {

		const currentDir = process.cwd()
		const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
		
		PDFInfoArray = files.map(async (file) => {
			const uploadPath = currentDir + '/storage/' + file.name;
			await file.mv(uploadPath)

			const PDFInfo = await getPDFText(new Uint8Array(file.data))
			return PDFInfo
		})

		PDFInfoArray = await Promise.all(PDFInfoArray)
		const result = await invoice.insertMany(PDFInfoArray)

		msgs.push('Files uploaded!')
		res.status(200).json({msgs, status: "ok", data: result});
	} catch (e) {
		 if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

invoiceRoute.get('/get-document', async (req, res) => {
	let msgs = [];
	const { documentName } = req.query

	try {
		const currentDir = process.cwd()
		const downloadFile = `${currentDir}/storage/${documentName}.pdf` ;
		res.header({ "Cache-Control": "no-cache" })
		res.download(downloadFile)
	} catch (e) {
		 if (e.constructor.name == "DatabaseError")
			msgs.push(e.constructor.name)
		else msgs.push(e.constructor.name + " - " + e.message)

		res.status(500).json({msgs, status: "error"});
	}
})

export default invoiceRoute