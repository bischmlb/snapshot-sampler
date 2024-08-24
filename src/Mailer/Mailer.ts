import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
// init env vars
dotenv.config();

type SendOptions = {
    to: string;
    subject: string;
    html: string;
};

class Mailer {
    public static transporter: Transporter;
    public static snapshotPath: string;

    public static async send(opts: SendOptions): Promise<void> {
        if (!this.transporter) {
            this.transporter = nodemailer.createTransport({
                service: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
        }

        try {
            await this.transporter.sendMail({ from: process.env.MAIL_FROM, ...opts });
            console.log('Successfully sent email');
        } catch (err) {
            console.error(err);
        }
    }
}

export default Mailer;
