import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, phone, event_date, event_type, message } = await req.json();
  
  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Dados do formulário ausentes.' }, { status: 400 });
  }
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO, // O e-mail que receberá a mensagem
    replyTo: name, // Para responder diretamente ao cliente
    subject: `Novo Orçamento: ${event_type} de ${name}`,
    html: `
      <h1>Nova Solicitação de Orçamento</h1>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>WhatsApp:</strong> ${phone}</p>
      <p><strong>Data do Evento:</strong> ${event_date || 'Não informada'}</p>
      <p><strong>Tipo de Evento:</strong> ${event_type}</p>
      <hr>
      <h2>Mensagem:</h2>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'E-mail enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Falha ao enviar o e-mail.' }, { status: 500 });
  }
}
