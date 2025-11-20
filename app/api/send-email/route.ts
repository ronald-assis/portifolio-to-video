import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, event_date, event_type, message } = await req.json();
    
    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Dados do formulário ausentes.' }, { status: 400 });
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: name,
      subject: `Novo Orçamento: ${event_type || 'Não especificado'} de ${name}`,
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
    
    transporter.sendMail(mailOptions).catch(console.error);
    
    return NextResponse.json({ message: 'Solicitação recebida com sucesso!' }, { status: 200 });
    
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json({ error: 'Falha ao processar a solicitação.' }, { status: 500 });
  }
}
