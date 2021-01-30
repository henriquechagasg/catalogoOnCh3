const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
// Connection URL


// Use connect method to connect to the Server

async function getAll(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection('Refers').find({})
		let products = []
		await cursor.forEach(product => {
			products.push(product)
		})
		return products
	}catch{
		console.error
	}
}

async function getRefer(refer){
	const regeX = /-/g; 
	refer = refer.replace(regeX, '\/')
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection('Variations').find({"REFER": refer})
		let products = []
		await cursor.forEach(product => {
			products.push(product)
		})
		return products
	}catch{
		console.error
	}
	
}

async function getProductPrice(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection('Prices').find({})
		let prices = []
		await cursor.forEach(price => {
			prices.push(price)
		})
		return prices
	}catch{
		console.error
	}
}

async function getOrders(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection('Orders').find({})
		let products = []
		await cursor.forEach(product => {
			products.push(product)
		})
		return products
	}catch{
		console.error
	}
}


module.exports = {
    getAll: getAll,
    getRefer: getRefer,
	getOrders: getOrders,
	getProductPrice: getProductPrice
}	