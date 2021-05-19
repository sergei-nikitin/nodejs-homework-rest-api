const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class Emailservice {
    #sender = sendgrid
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
              this.link = 'http://localhost:3000'
              break
            case 'production':
                this.link = 'link for production'
                break
            default: 
                this.link = 'http://localhost:3000'
                break  
        }
    }
    #createTemplateVerifyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'salted',
            product: {
                // Appears in header & footer of e-mails
                name: 'N_S_D',
                link: this.link
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            },
        })
        const email = {
            body: {
                name,
                intro: 'Welcome to N_S_D! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with N_S_D, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                }
            }
        };
         
        // Generate an HTML email with the provided contents
        const emailBody = mailGenerator.generate(email);
        return emailBody
    }
    async sendVerifyEmail(verifyToken, email) {
        this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: email, // Change to your recipient
          from: 'Nikitin_S@i.ua', // Change to your verified sender
          subject: 'Verify email',
          html: this.#createTemplateVerifyEmail(verifyToken),
        }
    
        this.#sender.send(msg)
      }
}

module.exports = Emailservice