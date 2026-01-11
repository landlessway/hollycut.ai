# Hollywood Cut (Set Visit)

Generate ultra-realistic Hollywood behind-the-scenes set photos using Google Gemini API.
基于 Google Gemini API 的超写实电影幕后片场照生成器。

## Tech Stack (技术栈)

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI**: Google GenAI SDK

## Setup (开发设置)

1. **Install Dependencies (安装依赖)**
   ```bash
   npm install
   ```

2. **Start Development Server (启动开发服务器)**
   ```bash
   npm run dev
   ```

3. **Build upon Production (构建生产版本)**
   ```bash
   npm run build
   ```

## Environment Variables (环境变量)

Since this is a client-side only application, the **API Key** is handled securely via user input in the browser and stored in `localStorage`. 

You do **NOT** need to configure `.env` for the API Key during build.

However, if you wish to configure other environment variables, use `.env` or `.env.local`:

```
# .env.local
VITE_SOME_CONFIG=value
```

## Deployment (部署)

This project is configured with **GitHub Actions** for automatic deployment to **GitHub Pages**.

### Steps to Deploy:

1. Push your code to the `main` branch.
2. Go to your GitHub Repository -> **Settings** -> **Pages**.
3. Under "Build and deployment", set "Source" to **GitHub Actions**.
4. The workflow will automatically pick up the `dist` folder created by the build job.

### Manual Deployment
You can also build locally and deploy the `dist` folder to any static hosting service (Vercel, Netlify, etc.).

## Project Specifications
See [project_spec.md](./project_spec.md) for detailed design and requirement docs.
