/*
    TS7016: Could not find a declaration file for module 'nodemailer'.
    '.../node_modules/nodemailer/lib/nodemailer.js' implicitly has
    an 'any' type.   If the 'nodemailer' package actually exposes
    this module, consider sending a pull request to amend
    'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/nodemailer`
 */
// @ts-ignore
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";
import {IConfig} from "../config/config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export enum HostType {
    ETHEREAL = 'ethereal',
    SENDMAIL = 'sendmail'
}
async function getTransportConfig(hostType: HostType) {
    let cfg: SMTPTransport.Options  = {}
    if (hostType === HostType.ETHEREAL) {
        let testAccount = await nodemailer.createTestAccount();
        cfg = {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        }
        console.log('Using ethereal SMTP server. Have created a test account.')
    }
    else if (hostType === HostType.SENDMAIL) {
        /*
        TS2322: Type '{ sendmail: boolean; newline: string; path: string; }' is not assignable to type 'Options'.
        Object literal may only specify known properties, and 'sendmail' does not exist in type 'Options'.
         */
        cfg = {
            // @ts-ignore
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        }
        console.log('Using sendmail os binary to set email')
    }
    else {
        console.log('Using defaults for transport configuration')
    }
    return cfg
}

export async function constructEmailSender(config: IConfig) {
    let key = config.emailSendMethod.toUpperCase()
    let hostType : HostType = HostType[key as keyof typeof HostType]; //Works with --noImplicitAny
    const trans = await getTransportConfig(hostType)
    return new EmailSender(config, trans)
}

export class EmailSender {

    private transporter: Mail;
    constructor(config: IConfig, transportConfig: SMTPTransport.Options ) {
        this.transporter = nodemailer.createTransport(transportConfig);
    }

    async sendMail(mailOptions: Mail.Options) {
        let info = await this.transporter.sendMail(mailOptions)
        //     {
        //     from: fromAddress,
        //     to: toAddress,
        //     subject: subject,
        //     text: plainTextBody,
        //     html: htmlBody
        // });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    async sendVerificationMail(toAddress: string, vcode: string) {
        const fromAddress = 'npuser@npuser.org'
        const plainTextBody = `verification code ${vcode}`
        const htmlBody = '<html><head></head>\n' +
            '  <body>\n' +
            '    <p>' +
            `verification code ${vcode}` +
            '    </p></body></html>'

        let info = await this.transporter.sendMail(
            {
            from: fromAddress,
            to: toAddress,
            subject: 'Verification code',
            text: plainTextBody,
            html: htmlBody
        });

        console.log("Message sent: %s", info.messageId);
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }
}
;
