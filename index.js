const express=require('express');
const urlRoute=require('./routes/url');
const Url=require('./models/url')
const{connectToMongoDB}=require('./connect');
const app=express();
const PORT=8001;
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));
app.use(express.json());
app.use('/url',urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
   const entry= await Url.findOneAndUpdate({
        shortId
    },{$push:{visitHistory:{timestamp:Date.now()}}})


res.redirect(entry.redirectURL);
});
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
    
})