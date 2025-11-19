import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, eventDate, eventType } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Orçamento Filmmaker: ${name} - ${eventType}`,
      html: `
        <h2>Novo Pedido de Orçamento</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de Evento:</strong> ${eventType}</p>
        <p><strong>Data:</strong> ${eventDate}</p>
        <p><strong>Mensagem:</strong><br/>${message}</p>
      `,
    });
    
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Erro no envio de email:', err);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}