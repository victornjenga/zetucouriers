import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
  //   NOTE: Uncomment the below lines to make the code work

  try {
    await sendgrid.send({
      to: ['Srijasabananthan49@gmail.com', 'rotcivnjenga1@gmail.com'], // Your email where you'll receive emails
      from: 'info@civrot.co.ke', // your website email address here
      subject: 'NEW SIGN UP',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">

        <title>Contact Form</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

        <link rel="stylesheet" href="css/styles.css?v=1.0">

      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h2>Srisai Fashion</h2>
              <h3>You've got a new Sign Up from ${req.body.name}, <br> Their email is: ✉️${req.body.email} </h3>
              <div style="font-size: 16px;">
              <p>Phone Number: ${req.body.phone}</p>
              <p>Country: ${req.body.country}</p>
              <p>Location Address: ${req.body.address}</p>
              
              <br>
              </div>
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Srisai Fashion<br>+254114239961</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://www.srisaifashion.com/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                

              </div>
              </div>
      </body>
      </html>`,
    })
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default sendEmail
