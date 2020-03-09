let {user_ID}=req.params; //ID user table
const { email, title, description } = req.body;
const contact = {
    email,
    title,
    description,
    user_id: req.user.user_id
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'nodejsproject123',
    pass: 'Assembler11' ///
    }
});
    const mailOptions={
        from: email,
        cc:email,
        to:'nodejsproject123@gmail.com', //
        subject: title,
        text: block_text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        res.redirect('....your route...');
        } else {
        res.redirect('....your route....');
        }
    });

    module.exports= nodemailer