import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, event_date, event_type, message } = body;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.EMAIL_TO,
      subject: `Novo Orçamento - ${name}`,
      html: `
        <h2>Novo Orçamento Solicitado</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>Data do Evento:</strong> ${event_date || 'Não informada'}</p>
        <p><strong>Tipo de Evento:</strong> ${event_type}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    );
  }
}
