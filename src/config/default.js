module.exports = {
     app: {
          PORT: process.env.PORT
     },
     mail: {
          //google.com.vn
          host: process.env.MAIL_HOST,
          //port server send mail
          port: process.env.MAIL_PORT,
          secure: false,
          auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASS
          }
     }
}