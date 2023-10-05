
const webhook = async (req, res) => {
    try{
        const body = await req.body;
        if (body.event === 'charge.sucess'){
            console.log("[SUCESS] - Payment Successful")
            setTimeout(console.log("Sending Order Mail to User \\\\\\\?///////\\\\\\\\ "), 1000)
            console.log("Order is being packaged...")
        }
    }catch(err){
        console.log(err)
    }
}