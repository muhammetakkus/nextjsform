// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, surname, tc, gsm, value, classs, veliname } = req.body;

    // E-posta gönderme işlemini gerçekleştirin
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'hesap.akkus@gmail.com',
          pass: 'dnbqgkcxgfnlkstk',
        },
      });

      const mailOptions = {
        from: 'hesap.akkus@gmail.com',
        to: 'mustafasahin8870@gmail.com',
        subject: 'Bakırköy Enderun',
        text: `
          İsim: ${name}
          Soyisim: ${surname}
          Tc: ${tc}
          Gsm: ${gsm},
          Doğum: ${value.startDate},
          Geçtiği Sınıf: ${classs},
          Veli Adı: ${veliname},
          Kurum: ${kurum},
        `,
      };

      await transporter.sendMail(mailOptions);

      console.log('E-posta gönderildi!');

      res.status(200).json({ message: 'E-posta gönderildi!' });
    } catch (error) {
      console.error('E-posta gönderilirken hata oluştu:', error);

      res.status(500).json({ error: 'E-posta gönderilirken hata oluştu' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST istekleri kabul edilmektedir' });
  }
}
