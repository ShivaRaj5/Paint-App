const express=require('express');
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
const PORT=process.env.PORT || 5000;
mongoose.connect("mongodb+srv://shivaraj:Shiva123@cluster0.lce2p.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("No connection")
})
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})
//generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},"mynameisshivarajiamacompetitiveprogrammer")
        console.log(token)
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
const signupUsers=new mongoose.model("signupUsers",userSchema);
const authenticate=async (req,res,next)=>{
    try{
        let token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,"mynameisshivarajiamacompetitiveprogrammer");
        const rootUser=await signupUsers.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser)
            throw new Error("User not found!")
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id; 
        next();
    }catch(err){
        res.status(401).send("Unauthorize Access");
        console.log(err);
    }
}
app.post('/signup',async (req,res)=>{
    const {name,email,phone,password,cpassword}=req.body;
    try{
        if(password!==cpassword)
            return res.status(401).send("Passwords do not match")
        const saveUsers=new signupUsers({name,email,phone,password,cpassword});
        const saveData=await saveUsers.save();
        if(saveData)
            res.status(200).send("Sign up");
        else
            res.status(409).send("Not sign up");
    }catch(err){
        res.status(404).send(err);
    }
})
app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const findUsers=await signupUsers.findOne({email})
        if(findUsers){
            if(findUsers.password==password){
                const token=await findUsers.generateAuthToken();
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+258920000)
                })
                // console.log(token)
                res.status(200).send("Login successfull");
            }
            else
                res.status(401).send("Password do not match");
        }
        else
            res.status(409).send("Email do not exist");
    }catch(err){
        res.status(404).send(err);
    }
})
app.get('/artboard',authenticate,(req,res)=>{
    res.send(req.rootUser);
})
app.get('/logout',(req,res)=>{
    res.clearCookie("jwtoken",{path:'/'})
    res.status(200).send("Logged out successfully!");
})
app.listen(PORT,()=>{
    console.log("Listening to the port "+PORT);
})