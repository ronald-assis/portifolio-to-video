# Video Portfolio & Contact Website

A modern Next.js portfolio website built for a videographer/filmmaker, featuring a video gallery and integrated contact form with email notifications.

## ✨ Features

- **Video Portfolio Gallery**: Showcase your video work with a responsive grid layout
- **Video Modal Player**: Watch videos in a full-screen modal with smooth animations
- **Contact Form**: Integrated contact form with email notifications via Nodemailer
- **FAQ Section**: Built-in frequently asked questions for clients
- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look
- **Type-Safe**: Written in TypeScript for better developer experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer
- **Icons**: React Icons
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- SMTP email account (Gmail, Outlook, etc.)

## 🚀 Getting Started

### 1. Clone the repository

```bash
    git clone <your-repo-url>
    cd portifolio-to-video
```


### 2. Install dependencies

```bash
    pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
    # SMTP Configuration for sending emails
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-email@gmail.com
    SMTP_PASS=your-app-password
    
    # Email destination for quote requests
    EMAIL_TO=your-email@gmail.com
    
    # Google Sheets Configuration
    GOOGLE_SHEET_ID=your-spreadsheet-id
    GOOGLE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

**Important for Gmail users:**
- For `GOOGLE_SHEET_ID`: Copy from the spreadsheet URL
- For `GOOGLE_CLIENT_EMAIL`: Found in the downloaded JSON file as `client_email`
- For `GOOGLE_PRIVATE_KEY`: Found in the JSON file as `private_key` (keep the quotes and `\n` characters)


- Enable 2-Factor Authentication
- Generate an [App Password](https://myaccount.google.com/apppasswords)
- Use the app password in `SMTP_PASS` (not your regular password)

**For other email providers:**

**Outlook/Hotmail:**
```bash
    SMTP_HOST=smtp-mail.outlook.com
    SMTP_PORT=587
```

**Yahoo:**
```bash
    SMTP_HOST=smtp.mail.yahoo.com
    SMTP_PORT=587
```

### 4. Run the development server

```bash
    pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portifolio-to-video/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # Email API endpoint
│   │   └── sheet/
│   │       └── route.ts          # Google Sheets API endpoint
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── videos/
│   │   └── page.tsx              # Video gallery page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── ContentSection.tsx        # Reusable content section
│   ├── Hero.tsx                  # Hero section component
│   ├── Navbar.tsx                # Navigation bar
│   ├── VideoGrid.tsx             # Video grid layout
│   └── VideoModal.tsx            # Video modal player
├── data/
│   └── videos.ts                 # Video data
├── types/
│   └── index.ts                  # TypeScript type definitions
└── public/
    └── thumbs/                   # Video thumbnails
```

## 🎨 Customization

### Adding Videos

Edit `data/videos.ts`:

```typescript
export const videos: Video[] = [
  {
    id: '1',
    title: 'Your Video Title',
    category: 'Wedding', // or 'Event', 'Retreat'
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
    thumbnail: '/thumbs/your-thumbnail.png',
    description: 'Your video description',
  },
  // Add more videos...
];
```

### Modifying Contact Form

The contact form is in `app/contact/page.tsx`. Fields include:
- Name (required)
- WhatsApp/Phone (required)
- Event Date
- Event Type (dropdown)
- Message (required)

#### Form submissions are automatically saved to:
1. Email: Sent via Nodemailer to `EMAIL_TO`
2. Google Sheets: Stored in the configured spreadsheet with columns:

- Nome (Name)
- Telefone (Phone)
- Mensagem (Message)
- Data do Evento (Event Date)
- Tipo de Evento (Event Type)
- Data de Envio (Submission Date)

### 📧 Email & Data Storage
The contact form sends data to two endpoints:
- `/api/send-email`: Sends email notification
- `/api/sheet`: Saves data to Google Sheets


### Updating FAQs

Edit the `faqs` array in `app/contact/page.tsx`:

```typescript
const faqs = [
  {
    q: 'Your question?',
    a: 'Your answer...',
  },
  // Add more FAQs...
];
```

## 📧 Email Configuration

The contact form sends emails using the API route at `app/api/send-email/route.ts`. Emails are sent asynchronously to avoid timeouts.

**Email template includes:**
- Client name
- WhatsApp contact
- Event date
- Event type
- Custom message

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- Environment variables
- Next.js App Router

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ronald Assis**
- GitHub: [@ronald-assis](https://github.com/ronald-assis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
```
