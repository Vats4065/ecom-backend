const { default: Stripe } = require("stripe")("sk_test_51PRYHRLdUI6Jl6jNlRSgidkQczf0FNEfTLjKIqRAD1aMZEJMSwfOpAccuwWVU2RcHG7H4yyPkvHUp0gYydBhwJ1g00LGCU4PJn");

exports.checkOut = async (req, res) => {
    const item = req.body.items
    try {
        const line_items = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }]


        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        })

        res.status(200).json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error })
    }

}
