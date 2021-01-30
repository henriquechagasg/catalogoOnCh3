const fs = require("fs")
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL


// Use connect method to connect to the Server

async function getAll(){
	const password = encodeURI(fs.readFileSync('login.txt', 'utf-8'))
	const uri = `mongodb+srv://ch3moda:${password}@cluster0.t9qoq.mongodb.net/productsDb?retryWrites=true&w=majority`;
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		console.log('Database Connected')
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
	const password = encodeURI(fs.readFileSync('login.txt', 'utf-8'))
	const uri = `mongodb+srv://ch3moda:${password}@cluster0.t9qoq.mongodb.net/productsDb?retryWrites=true&w=majority`;
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
	const password = encodeURI(fs.readFileSync('login.txt', 'utf-8'))
	const uri = `mongodb+srv://ch3moda:${password}@cluster0.t9qoq.mongodb.net/productsDb?retryWrites=true&w=majority`;
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
	const password = encodeURI(fs.readFileSync('login.txt', 'utf-8'))
	const uri = `mongodb+srv://ch3moda:${password}@cluster0.t9qoq.mongodb.net/productsDb?retryWrites=true&w=majority`;
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