const dbOperations = require('./dboperations');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { cloudinary } = require('./cloudinary');
const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const showProductsDb = require('./models/productsToShow');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const { isLoggedIn } = require('./middlewares/index');
const catchAsync = require('./utils/catchAsync');


const dbUrl = process.env.MONGO_URI 

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }

}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.get('/login', async(req, res) => {
    res.render('users/login');
});

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), async(req, res) => {
    const redirectUrl = req.session.returnTo || '/ch3Secret/update'
    delete req.session.returnTo
    res.redirect(redirectUrl)
});



// app.get('/register', async(req, res) => {
//     res.render('users/register')
// })

// app.post('/register', async(req,res) => {
//     try {  
//         const { username, email, password } = req.body;
//         const user = new User({ username, email });
//         await User.register(user, password);
//         res.redirect('/login')
//     } catch (e){
//         console.log(e)
//         res.redirect('/register')
//     }


app.get('/', async (req, res) => {
    
    let products = await dbOperations.getAll()
    let prices = await dbOperations.getProductPrice()
    let categorys = await dbOperations.getCategorys()
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        })

        product['image'] = []
        productToShow.forEach(el => {
            let index = el.Product.indexOf('&');
            currentProduct = el.Product.slice(0, index);
            if (product.REFER == currentProduct){
                product['isAdded'] = true
                product['image'].push(el.url);
            }
        })
    }
    
    res.render('home', { products, prices, categorys })    
})

app.get('/?r=:refer', async(req, res) => {
    let prices = await dbOperations.getProductPrice()
    const { refer } = req.params;
    const regex = /\//g;
    const products = await dbOperations.getRefer(refer);
    const orders = await dbOperations.getOrders(refer);
    let productToShow = await dbOperations.findProductShow();

    // Fixing Products data Based in other Tables
    for await (product of products){

        productToShow.forEach(el => {
            currentProductCompleteName = `${product.REFER.trim()}&${product.DESCR.trim()}`
            if (currentProductCompleteName == el.Product){
                product['image'] = el.url
            }
        });

        // Getting the price for each Product
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        })

        // Taking out the ordered products from total
        orders.forEach(order => {
            if (order.REFER == product.REFER && order.DESCR.trim() == product.DESCR.trim()){
                if (order.P){
                    product.P = (Number(product.P) - Number(order.P))
                }
                if (order.M){
                    product.M = (Number(product.M) - Number(order.M))
                }
                if (order.G){
                    product.G = (Number(product.G) - Number(order.G))
                }
                if (order.GG){
                    product.GG = (Number(product.GG) - Number(order.GG))
                }                
            }
        })

    }
    
    res.render('refer', { refer, products, regex })    
})

app.get('/?q=:category', async(req, res) => {
    const { category } = req.params
    products = await dbOperations.getAll(category.toUpperCase());
    let prices = await dbOperations.getProductPrice();
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        
        prices.forEach(productPrice => {
            if (productPrice.REFER == product.REFER) {
                product['pPrice'] = productPrice.P
                product['mPrice'] = productPrice.M
                product['gPrice'] = productPrice.G
                product["ggPrice"] = productPrice.GG
            }
        });

        product['image'] = []
        productToShow.forEach(el => {
            let index = el.Product.indexOf('&');
            currentProduct = el.Product.slice(0, index);
            if (product.REFER == currentProduct){
                product['isAdded'] = true
                product['image'].push(el.url);
            }
        });
    }

    res.render('category', { products,  prices, category }) 
});

app.get('/ch3Secret/update', isLoggedIn, catchAsync(async(req, res) => {
    res.render('search');
}));

app.get('/ch3Secret/update/:refer', isLoggedIn,  async(req, res) => {
    const { refer } = req.params;
    const products = await dbOperations.getRefer(refer);
    let productToShow = await dbOperations.findProductShow();
    for await (product of products) {
        productToShow.forEach(el => {
            productName = `${product.REFER.trim()}&${product.DESCR.trim()}`
            if (productName == el.Product){
                product['isAdded'] = true
            }
        })
    }
    res.render('update', { products });

});

app.post('/ch3Secret/update/:refer',isLoggedIn, upload.single('image'), async(req, res) => {
    const { refer } = req.params;
    const addProduct = new showProductsDb(req.body)
    addProduct.url = req.file.path;
    addProduct.filename = req.file.filename
    await addProduct.save()
    res.redirect(`/ch3Secret/update/${refer}`);

});

app.delete('/ch3Secret/update/:refer',isLoggedIn, async(req, res) => {
    const { refer } = req.params;
    const productToDelete = await showProductsDb.findOne(req.body);
    await cloudinary.uploader.destroy(productToDelete.filename)
    await showProductsDb.findOneAndDelete(req.body);
    res.redirect(`/ch3Secret/update/${refer}`);
});

app.listen(process.env.PORT || 3000)