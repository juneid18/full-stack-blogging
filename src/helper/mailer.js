import nodemailer from 'nodemailer';
import User from '@/module/userModule';
import bcryptjs from 'bcryptjs'

export const sendmail = async ({email, emailType, userId}) =>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      if(emailType === 'VERIFY'){
        const updateUser = await User.findByIdAndUpdate(userId,  //checking the emailtype is verify then updateing
          {                                                      // the verifyToken and verifyTokenExpiry 
            $set: {
            verifyToken: hashedToken, 
            verifyTokenExpiry: Date.now() + 3600000
          }
          }
        );
        console.log("Updated user verify ", updateUser); // consoling the updated data
        
      }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,
          {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000}
        )
      }
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAILERUSER,
          pass: process.env.NODEMAILERPASSWORD
        }
      });
          
          const mailOptions = {
            from: "juneidshaikh18@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset your password", 
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyMail?token=${hashedToken}'>here</a> to ${emailType === "VERIFY" ? "verify from email" : "reset your password"}
            or copy and paste the URI in your Browser
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          };

          const mailresponce = await transport.sendMail(mailOptions);
          return mailresponce;
    } catch (error) {
        throw new Error(error.message);
    }
}
