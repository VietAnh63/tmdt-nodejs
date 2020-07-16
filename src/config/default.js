module.exports = {
     app: {
          PORT: process.env.PORT || 3000
     },
     mail: {
          //google.com.vn
          host: "smtp.gmail.com",
          //port server send mail
          port: 587,
          secure: false,
          auth: {
               user: "vietanh.hn.4078@gmail.com",
               pass: "mqvlmpcfwmpivbln"
          }
     }
}