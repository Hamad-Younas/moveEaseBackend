const express = require("express");
const router = express.Router();
const stripe = require('stripe');

const stripeInstance = stripe('sk_test_51OogewEJ7sYHi0UbJ7Hy4UW56wLLMWnqdElvT3QdO5azMHfwgIxleNA9ZmyyMeDTgAhkWEnn0jLThpanUcuxDuo900lppL2v1R');

router.post('/',(req,response)=>{
  console.log(req.body);
    async function checkout(){
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data:{
                    currency: 'pkr',
                    product_data:{
                        name: req.body.title,
                        images:[req.body.img],
                    },
                    unit_amount: req.body.price * 100000,
                },
                quantity: req.body.quantity,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:8800/api/userSubscription/add?session_id={CHECKOUT_SESSION_ID}&data=${encodeURIComponent(JSON.stringify(req.body))}`,
            cancel_url: 'http://localhost:3000',
          });
          console.log(session.url)
          return session.url;
    }

    checkout().then((url)=>response.send(url))
    .catch((error)=>console.log(error));
})

router.post('/sub',(req,response)=>{
  console.log(req.body);
    async function checkout(){
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data:{
                    currency: 'pkr',
                    product_data:{
                        name: req.body.title,
                        images:[req.body.img],
                    },
                    unit_amount: req.body.price * 100000,
                },
                quantity: req.body.quantity,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:8800/api/serviceProviderSubscription/add?session_id={CHECKOUT_SESSION_ID}&data=${encodeURIComponent(JSON.stringify(req.body))}`,
            cancel_url: 'http://localhost:3001',
          });
          console.log(session.url)
          return session.url;
    }

    checkout().then((url)=>response.send(url))
    .catch((error)=>console.log(error));
})

module.exports = router;