const nodemailer = require('nodemailer')
const sendMail = async (req) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            // port: 465,
            // secure: true,
            auth: {
                user: "nugrohosantoso454545@gmail.com",
                pass: "zaetbfakboooyihl",
            },
        });
        let mailOptions = {
            from: '"Detak" <donotreplyDetak@gmail.com>',
            to: req.user.email,
            subject: "Terimakasih telah mendaftar di situs kami",
            text: "<3",
            html: `Hello! sekarang anda dapat membaca semua berita dari seluruh penyedia berita! `,
        };

        const sendMail = await transporter.sendMail(mailOptions);
        return sendMail;
    } catch (err) {
        throw { err };
    }
};

module.exports = sendMail;
