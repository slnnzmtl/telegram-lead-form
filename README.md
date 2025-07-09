# Telegram Channel Post Creator

A modern SPA application built as a Telegram Mini App for creating and editing channel posts with image support and reply markup buttons.

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for build tooling

## Architecture Principles

This application follows software engineering best practices:

- **DRY (Don't Repeat Yourself)**: Reusable composables and components
- **KISS (Keep It Simple, Stupid)**: Clear and simple component structure
- **SOLID Principles**: 
  - Single Responsibility: Each component has one clear purpose
  - Open/Closed: Components are open for extension via props/events
  - Liskov Substitution: Components can be easily swapped
  - Interface Segregation: Clean interfaces via TypeScript
  - Dependency Inversion: Composables provide abstractions
- **YAGNI (You Aren't Gonna Need It)**: Only implemented required features

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ContentEditor.vue
│   ├── ImageUpload.vue
│   ├── ButtonManager.vue
│   └── PublishButton.vue
├── composables/         # Business logic composables
│   ├── useTelegram.ts
│   ├── usePostEditor.ts
│   ├── useImageUpload.ts
│   └── useButtonManager.ts
├── services/           # API services
│   └── api.ts
├── types/             # TypeScript type definitions
│   ├── telegram.ts
│   └── app.ts
├── App.vue           # Main application component
├── main.ts          # Application entry point
└── style.css       # Global styles
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the webhook URL in `src/App.vue`:
```typescript
const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features

- **Content Editor**: Markdown-supported text area for post content
- **Image Upload**: File upload with preview and removal
- **Button Manager**: Dynamic reply markup buttons with validation
- **Edit Mode**: Support for editing existing posts
- **Telegram Integration**: Full Telegram Mini App integration
- **Dark Mode**: Automatic dark/light theme support
- **Type Safety**: Full TypeScript coverage

## Telegram Integration

The app integrates with Telegram Web Apps API:
- Initializes on mount
- Handles edit mode via start parameters
- Closes app after successful publish
- Supports Telegram theming

## API Payload

The app sends data in this format:
```typescript
{
  is_edit: boolean;
  message_id: number | null;
  content: string;
  image_data: string | null; // base64 encoded
  reply_markup: Array<{text: string, url: string}>;
}
```

## Browser Development

The app gracefully handles running outside Telegram for development purposes, with console warnings for missing Telegram WebApp features.
