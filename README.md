# CyberSentinel

> An AI-powered agent that simplifies cybersecurity due diligence for SMBs through a conversational, guided, and visually stunning experience.

CyberSentinel is a sophisticated, AI-driven platform designed to revolutionize how Small and Medium-sized Businesses (SMBs) handle cybersecurity due diligence. It transforms the arduous process of completing security questionnaires into an intuitive, conversational, and educational experience. The core of the platform is an AI agent that guides users through every step, from initial business profiling to generating polished, submission-ready reports.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/armagi009/cybersentinel)

## Key Features

-   **🤖 AI-Powered Conversational Interface**: A natural, chat-based experience that guides users through complex questionnaires, demystifying jargon and providing context-aware assistance.
-   **🧠 Intelligent Onboarding**: The AI agent creates a unique "Security Profile" for your business by asking simple questions about your industry and data handling practices.
-   **Flexible Questionnaire Handling**: Supports both standard industry frameworks (SOC 2, ISO 27001, etc.) and custom questionnaires uploaded by the user (PDF/DOC).
-   **📝 Automated Gap Analysis**: Upon completion, the AI analyzes responses to identify security gaps and generates a prioritized, actionable report for internal improvement.
-   **📚 Persistent Knowledge Base**: Securely stores all answers and evidence, pre-populating future questionnaires to save time and ensure consistency.
-   **📄 Professional Report Generation**: Creates clean, professional, submission-ready questionnaires and detailed internal action plans.

## Technology Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS
-   **UI Components**: shadcn/ui, Lucide React
-   **State Management**: Zustand
-   **Animation**: Framer Motion
-   **Backend**: Cloudflare Workers, Hono
-   **Persistence**: Cloudflare Agents (Durable Objects)
-   **AI Integration**: OpenAI SDK, Cloudflare AI Gateway

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logged into your Cloudflare account (`wrangler login`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cybersentinel.git
    cd cybersentinel
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.dev.vars` file in the root of the project for local development. Wrangler will automatically load these variables.

    ```ini
    # .dev.vars

    # Your Cloudflare AI Gateway URL
    # Example: https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_NAME/openai
    CF_AI_BASE_URL="your-gateway-url"

    # A Cloudflare API Key with AI Gateway permissions
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    **Note**: Never commit your `.dev.vars` file to version control.

## Development

To start the development server, which includes the Vite frontend with Hot Module Replacement (HMR) and the local Wrangler server for the backend API, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified in your terminal). The backend worker API will be proxied, allowing the frontend to make requests to `/api/*` seamlessly.

## Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Build the application:**
    The deployment script automatically handles the build process.

2.  **Deploy to Cloudflare:**
    Run the following command to deploy your application and worker:

    ```bash
    bun deploy
    ```

    This command will build the Vite frontend, bundle the worker code, and deploy everything to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/armagi009/cybersentinel)

## Project Structure

-   `worker/`: Contains all the backend code for the Cloudflare Worker, including Hono routes, the ChatAgent Durable Object, and AI integration logic.
-   `src/`: Contains the frontend React application source code.
    -   `src/pages/`: Top-level page components.
    -   `src/components/`: Reusable UI components, including shadcn/ui primitives.
    -   `src/lib/`: Utility functions and client-side API services.
    -   `src/hooks/`: Custom React hooks.
-   `wrangler.jsonc`: Configuration file for the Cloudflare Worker.
-   `vite.config.ts`: Configuration file for the Vite frontend build tool.