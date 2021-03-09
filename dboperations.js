const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
// Connection URL


// Use connect method to connect to the Server

async function getAll(category){
	const uri = process.env.MONGO_URI
	const categoryPassed = category || undefined
	if (categoryPassed) {
		try {
			const client = new MongoClient(uri);
			// Connect to the MongoDB cluster
			await client.connect();
			const db = client.db("productsDb")
			const cursor = db.collection('Refers').find({"CADPROGDESCR": categoryPassed})
			let products = []
			await cursor.forEach(product => {
				products.push(product)
			})
			client.close()
			return products
		}catch{
			console.error
		}
	} else {
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
			client.close()
			return products
		}catch{
			console.error
		}
	}

}

async function getAllRefers(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection('Variations').find({})
		let products = []
		await cursor.forEach(product => {
			products.push(product)
		})
		client.close()
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
		client.close()
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
		client.close()
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
		client.close()
		return products
	}catch{
		console.error
	}
}

async function getCategorys(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = await db.collection("Refers").distinct("CADPROGDESCR")		
		return cursor
		client.close()
	}catch{
		console.error
	}
}

async function removeProductShow(product){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		await db.collection("showproducts").findOneAndDelete({"Product": product.Product});
		client.close()
	}catch{
		console.error
	}
}


async function findProductShow(){
	const uri = process.env.MONGO_URI
	try {
		const client = new MongoClient(uri);
		// Connect to the MongoDB cluster
		await client.connect();
		const db = client.db("productsDb")
		const cursor = db.collection("showproducts").find({});
		let products = []
		await cursor.forEach(product => {
			products.push(product)
		})
		client.close()
		return products
	}catch{
		console.error
	}
}



module.exports = {
    getAll: getAll,
	getAllRefers: getAllRefers,
    getRefer: getRefer,
	getOrders: getOrders,
	getProductPrice: getProductPrice,
	getCategorys: getCategorys,
	removeProductShow: removeProductShow,
	findProductShow: findProductShow
}	