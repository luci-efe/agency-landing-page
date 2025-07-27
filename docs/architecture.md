# [Nombre de la Empresa] Fullstack Architecture Document

## 1. Introduction

#### Document Purpose
This document outlines the complete fullstack architecture for the `[Nombre de la Empresa]` landing page, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

#### Starter Template
The project is a greenfield application initialized using the standard `create-next-app` CLI with TypeScript and Tailwind CSS. It is not based on a pre-existing or specialized starter template.

#### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| July 26, 2025 | 1.0 | Initial Architecture Draft | Winston (Architect) |

## 2. High Level Architecture

#### Technical Summary
This project will be a modern, full-stack application built on Next.js, architected in a Jamstack and serverless style. The frontend will be a statically generated React application featuring a highly interactive 3D scene authored in Spline. The backend will consist of serverless functions (Next.js API Routes) to connect to a Supabase database for lead capture. This architecture is designed for exceptional performance, scalability, and maintainability.

#### Platform and Infrastructure Choice
* **Platform:** Vercel
* **Key Services:** Vercel for Next.js Hosting, Serverless Functions, and Edge Network; Cloudflare for DNS, CDN, and Security; Supabase for the PostgreSQL database.
* **Deployment Host and Regions:** Vercel's global edge network.

#### Repository Structure
* **Structure:** Monorepo, managed via standard npm/yarn workspaces.

#### High Level Architecture Diagram
[Mermaid Diagram showing the data flow: User's Browser -> Cloudflare -> Vercel (hosting Next.js App) -> which in turn connects to Supabase for data and Spline for the 3D scene.]

#### Architectural Patterns
* **Jamstack:** The core of the site will be pre-rendered into static files. Dynamic functionality will be handled by client-side React and serverless functions for optimal performance and security.
* **Serverless Functions:** We will use Next.js API Routes for backend logic, which eliminates server management and scales automatically.
* **Component-Based UI:** The frontend will be built with reusable, encapsulated React components for maintainability and testability.
* **Static Site Generation (SSG):** The primary rendering strategy will be SSG to provide the fastest possible load times.

## 3. Tech Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | `~5.5` | Adds static typing to JavaScript. |
| **Framework** | Next.js | `~14.2` | The full-stack React framework. |
| **UI Library** | React | `~18.3` | Core library for building UI components. |
| **Styling** | Tailwind CSS | `~3.4` | A utility-first CSS framework. |
| **Headless UI** | Radix UI | `~1.1` | Unstyled, accessible UI primitives. |
| **3D Rendering** | React Three Fiber | `~8.16` | React renderer for Three.js. |
| **3D Authoring** | Spline | `N/A` | Browser-based 3D design tool. |
| **Internationalization**| next-intl | `~3.15` | Internationalization for Next.js. |
| **Backend Runtime** | Node.js | `~20.11` (LTS) | JavaScript runtime environment. |
| **Database** | Supabase (Postgres) | `~15` | Database and backend-as-a-service. |
| **Database Client** | @supabase/supabase-js| `~2.43` | Official client library for Supabase. |
| **Hosting** | Vercel & Cloudflare | `N/A` | Deployment and CDN platforms. |
| **Unit/Integration Test**| Jest | `~29.7` | JavaScript Testing Framework. |
| **E2E Testing** | Cypress | `~13.10`| End-to-end testing framework. |
| **Code Quality** | ESLint & Prettier | `~9.3` / `~3.2` | Linter and Code Formatter. |

## 4. Data Models

#### Model: Lead
* **Purpose:** To store submissions from the website's contact form.
* **TypeScript Interface:** A TypeScript interface named `Lead` will be defined with properties: `id`, `createdAt`, `name`, `email`, `message`, and `status`.

## 5. API Specification

[An OpenAPI 3.0.1 specification in YAML format. It defines a single POST endpoint at `/api/leads` for submitting a new lead. The request body schema (`NewLead`) requires `name`, `email`, and `message`. The successful response (`201`) returns the full `Lead` object, including server-generated fields like `id` and `createdAt`.]

## 6. Components

* **WebApp (Frontend):** Renders the UI, handles user interactions, and communicates with the backend API.
* **APIService (Backend):** Handles incoming API requests (e.g., lead submission), validates data, and executes business logic.
* **DatabaseService (Backend):** Acts as an abstraction layer for all database operations.
* **SplineService (External):** Third-party service that hosts and serves the interactive 3D scene.

## 7. External APIs

* **Supabase API:** Provides database services. Authenticated via a secure Service Role API Key stored as a server-side environment variable.
* **Spline 3D Scene API:** Loads and displays the interactive 3D scene. Integrated via the `@splinetool/react-spline` component.

## 8. Core Workflows

#### Lead Capture Workflow
[A Mermaid Sequence Diagram showing the flow: User submits form -> Frontend sends POST request to Backend API -> Backend Service validates and calls Database Service -> Database Service inserts record into Supabase -> A success response is returned to the user.]

## 9. Database Schema

[A SQL `CREATE TABLE` script for `public.leads`. It defines columns `id` (uuid, primary key), `created_at` (timestamp), `name` (text), `email` (text), `message` (text), and `status` (text with a check constraint). It also includes a command to enable Row Level Security (RLS) as a best practice.]

## 10. Frontend Architecture
* **Component Organization:** A feature-based directory structure (`src/components/features`, `ui`, `layout`).
* **State Management:** Local state via `useState` and minimal global state via `useContext`.
* **API Communication:** A dedicated service layer in `src/lib/api.ts` will handle all `fetch` calls.

## 11. Backend Architecture
* **Service Architecture:** Serverless functions using Next.js API Routes organized in `src/app/api/`.
* **Data Access Layer:** A dedicated service layer in `src/lib/database.ts` will handle all Supabase client interactions.

## 12. Unified Project Structure
[An ASCII tree diagram showing the complete folder structure for the Next.js monorepo. It includes the `src` directory with `app`, `components`, `lib`, and `styles`, as well as root-level config files and the `docs` folder.]

## 13. Development Workflow
* **Local Setup:** Standard workflow: `git clone`, `npm install`, then run `npm run dev`.
* **Environment Variables:** Configuration for Supabase keys will be stored in a `.env.local` file.

## 14. Deployment Architecture
* **Strategy:** A Git-based, continuous deployment strategy via Vercel's Git integration.
* **CI/CD:** A GitHub Actions workflow will run linting and testing on every push and pull request.
* **Environments:** Distinct environments for Development (localhost), Preview (Vercel PR deployments), and Production.

## 15. Security and Performance
* **Security:** Includes Content Security Policy (CSP), server-side input validation, rate limiting, and secure management of secret keys.
* **Performance:** Strategies include asset optimization, lazy loading for the 3D scene, code splitting, and leveraging Vercel's Edge CDN.

## 16. Testing Strategy
A "Full Testing Pyramid" approach will be used, combining Jest/RTL for unit/integration tests and Cypress for End-to-End tests.

## 17. Coding Standards
A minimal set of critical rules for API/database access, state management, styling, and naming conventions will be enforced.

## 18. Checklist Results Report
The Fullstack Architecture Document has been validated against the `architect-checklist`. The architecture is assessed to be robust, scalable, secure, and well-aligned with the project requirements. The plan is complete and **READY FOR DEVELOPMENT**.

## 19. Next Steps
With the completion of the three core planning documents (Brief, PRD, Architecture), the strategic planning phase is now concluded. The next step is to move into the **IDE Development Workflow**. The recommended process is to engage the **Scrum Master (SM)** agent in your IDE to create the first story (Story 1.1 from the PRD) and then use the **Developer (Dev)** agent to implement it.
