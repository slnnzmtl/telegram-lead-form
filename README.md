# Telegram Lead Form

A modern Telegram Mini App for collecting lead information via a simple, user-friendly form. Built with Vue 3, TypeScript, and Tailwind CSS, it integrates seamlessly with Telegram Web Apps and supports phone validation, custom messages, and instant submission to a webhook.

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **libphonenumber-js** (phone validation)

## Features

- **Lead Form**: Collects name, phone, and message from users
- **Phone Validation**: Real-time validation and formatting for phone numbers
- **Telegram Integration**: Uses Telegram Web Apps API for closing the app and theming
- **Instant Submission**: Sends form data to a configurable webhook URL
- **Responsive UI**: Mobile-first, beautiful gradient background
- **Reusable Components**: Input fields, phone input, textarea, and buttons

## Project Structure

```
src/
├── components/          # UI components (Button, InputField, InputPhone, LeadForm, TextArea)
├── composables/         # Business logic (useForm, useTelegram)
├── types/               # TypeScript types (app.ts, telegram.ts)
├── App.vue              # Main app component
├── style.css            # Global styles
├── main.ts              # Entry point
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the webhook URL in `.env`:
   ```env
   VITE_WEBHOOK_URL=YOUR_WEBHOOK_URL_HERE
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Architecture Principles

- **DRY**: Composables and components are reused
- **KISS**: Simple, clear structure
- **SOLID**: Each component/composable has a single responsibility
- **Type Safety**: All logic and data are typed

## Telegram Integration

- Initializes Telegram WebApp on mount
- Closes the app after successful submission
- Handles theming and browser fallback

## API Payload

Form data is sent as:
```typescript
{
  name: string;
  phone: string;
  message?: string;
  buttons?: Array<{ text: string; url: string }>;
}
```

## Browser Development

The app works outside Telegram for development, with graceful fallbacks and warnings for missing Telegram features.

## License

MIT
