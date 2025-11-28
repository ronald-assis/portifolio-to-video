import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: {
    name: string;
    phone: string;
    message: string;
    event_date: string;
    event_type: string;
  } = await req.json();
  
  console.log(process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.FROM_EMAIL, process.env.EMAIL_TO);
  
  console.log(process.env.GOOGLE_SHEET_ID, process.env.GOOGLE_PRIVATE_KEY, process.env.GOOGLE_CLIENT_EMAIL);
  
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    
    const sheets = google.sheets({ auth, version: 'v4' });
    
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    
    const firstSheetTitle = metadata.data.sheets?.[0]?.properties?.title || 'Sheet1';
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${firstSheetTitle}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            body.name,
            body.phone,
            body.message,
            body.event_date,
            body.event_type,
            new Date().toLocaleString()
          ]
        ],
      },
    });
    
    return NextResponse.json({ data: response.data });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}