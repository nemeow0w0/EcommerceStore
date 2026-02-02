const prisma = require("../config/prisma");
const stripe = require("stripe")(
  "sk_test_51SIK4WLb4R8d2x2IDMQkI79yYySQPXlps4ZRn1vtB2q5k57grcEK2Hf8CRTr7bfk4Ke4ZY3kGX6iPRpm4mb1tLXY00ljq7YLtl"
);

exports.setpayment = async (req, res) => {
  try {
    // code
    // Create a PaymentIntent with the order amount and currency

    const cart = await prisma.cart.findFirst({
      where:{
        orderedById: req.user.id
      }
    })
 
    const amountTHB = cart.cartTotal * 100

     // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
