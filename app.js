require("dotenv").config();
const	express 				= require("express"),
		app 					= express(),
		bodyParser 				= require("body-parser"),
		request 				= require("request"),
		methodOverride 			= require("method-override"),
		expressSanitizer		= require("express-sanitizer"),
		mongoose 				= require("mongoose"),
		flash					= require("connect-flash"),
		seedDB					= require("./seeds"),
		passport				= require("passport"),
		LocalStrategy			= require("passport-local"),
		passportLocalMongoose	= require("passport-local-mongoose"),
		url 					= process.env.DATABASE_URL || "mongodb://localhost:27017/zeinkap_portfolio",
        port 					= process.env.PORT || 3000
        
// requiring models


// requiring routes


//APP CONFIG 
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});		

// telling express to use these packages
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));	 
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));	
app.use(expressSanitizer());	
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({	
	secret: process.env.SECRET,	
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());	
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;	
	res.locals.error = req.flash("error");	
	res.locals.success = req.flash("success");	
	next();
});

app.listen(port, () => {
    console.log("Listing on port 3000");
});