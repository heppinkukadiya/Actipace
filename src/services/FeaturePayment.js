import toast from "react-hot-toast";
import { categories } from "./Api";
import axios from "axios";





function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = () =>{
            resolve(true);
        }
        script.onerror = () =>{
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

export async function buycourse(data,navigate) {
   // console.log(localStorage.getItem('token'))
   const toastId = toast.loading("loading...")
    try{

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failure")
        }

        const orderResponse = await axios.post(categories.CAPTUREPAYMENT_API,data,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

       // console.log("fe..",orderResponse);
        if(!orderResponse.data.success){
            toast.error(orderResponse.data.reasponse.data.message);
            //throw new Error(orderResponse.data.message)
        }

        const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.currency,
            amount:`${orderResponse.data.amount}`,
            order_id:orderResponse.data.payment_id,
            name:"Actipace",
            description:"Thank you for purchasing the software",
            handler: function(response){
                //verifypayment
                verifyPayment(response,navigate,orderResponse);
            }

        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        //return link;

    }catch(e){
        // console.log("PAYMENT IN ERROR....",e);
        // console.log("could not make payment")
        toast.error(e.response.data.message);
        //navigate("/login")

    }
    toast.dismiss(toastId)
}


async function verifyPayment(response,navigate,orderResponse) {


    const toastId = toast.loading("loading..")
    try{

        console.log(orderResponse);
        const reasponse = await axios.post(categories.VERIFYSIGNATURE_API,response,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        //console.log(reasponse.data)

        if(!reasponse.data.success){
            throw new Error(reasponse.data.message);
        }
        else{
            toast.success("payment Successfull")
            navigate("/login")
        }


        //return response;

    }catch(e){
        console.log("PAYMENT VERIFY ERROR....",e);
        toast.error(e.response.data.message)
    }

    toast.dismiss(toastId)
}
