const nodemailer=require('nodemailer');

exports.sendEMailFunction = (url,) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.email,
            pass:process.env.password
        },
    });
    const mailOptions = {
        from:process.env.email,    
        to: process.env.email,
        subject: 'Fundoo-Notes password reset link ',      
        text: 'You requested for password reset, kindly use this link : '+url+'\n\nCheers! \n\n\nThank you. \n-Fundoo Developer' 
    };
    transporter.sendMail(mailOptions,(err,info) => {
       
        if (err){
        console.log("is it is invalid");
        
            console.log("error on sending mail--", err)
        }
        else
            console.log('result of sending mail-- ',info);
    });
    
}