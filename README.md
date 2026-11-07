# EQUALIZE — System Documentation

EQUALIZE is an educational website about gender-based violence, harassment, equality, and
inclusion in the Philippines. It presents explanations, statistics, laws, and support resources
with links to official and institutional references.

This project is for education and awareness. It is not a legal service, emergency-response
service, or substitute for professional advice. Visitors should verify current information with
the linked sources.

## System overview

### Intended users

- People learning about gender-based violence, harassment, equality, and inclusion.
- Students and educators looking for an introduction supported by cited sources.
- Visitors seeking official references, legal information, or links to support services.

### Main capabilities

- Responsive site navigation for desktop and mobile.
- Educational pages with definitions, examples, and interactive explanations.
- A statistics dashboard with headline figures, comparisons, and charts.
- Summaries of selected Philippine laws with official-source links.
- Inclusive-language examples and an interactive personal commitment checklist.
- A categorized directory of learning, rights, help, and inclusion resources.
- Source references displayed throughout the site and collected on a dedicated page.

The site's interactive selections are held in page state only. The commitment checklist is not
saved, and the application does not collect or transmit personal information through that feature.

## Pages

| Route          | Page          | Purpose                                                                                   |
| -------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `/`            | Home          | Introduces the platform, links to key sections, and presents the Myth or Fact quiz.       |
| `/issue`       | The Issue     | Defines gender-based violence and presents its forms with examples and explanations.      |
| `/statistics`  | Statistics    | Shows selected indicators, survey comparisons, charts, and data context.                  |
| `/laws`        | Laws & Rights | Summarizes selected Philippine laws and links to official legal sources.                  |
| `/inclusion`   | Inclusion     | Presents inclusion principles and interactive inclusive-language examples.                |
| `/take-action` | Take Action   | Provides suggested actions, an in-memory commitment checklist, and categorized resources. |
| `/sources`     | Sources       | Lists the references used for statistics, laws, and educational content.                  |

## Technology and architecture

- **Application:** React and TypeScript.
- **Framework and routing:** TanStack Start and TanStack Router file-based routes.
- **Build and development server:** Vite.
- **Styling:** Tailwind CSS 4 with shared components and design tokens in `src/styles.css`.
- **Motion and icons:** Motion and Lucide.
- **Charts:** Chart.js, `react-chartjs-2`, and Recharts.
- **Deployment runtime:** Nitro using the Vercel preset.

The root route in `src/routes/__root.tsx` provides the HTML document shell, shared navigation,
main content outlet, footer, error and not-found screens, and the React Query provider. Individual
pages are route modules in `src/routes/`. TanStack's generated `src/routeTree.gen.ts` connects
those modules and must not be edited manually.

Most page content is static and is defined in `src/data/genderData.ts`. The data module contains
typed records for references, statistics, laws, forms of violence, quiz items, inclusion content,
actions, commitments, and resources. The interface links claims and figures to those references;
it does not fetch a live statistics feed or use an application database.

## Project structure

```text
src/
  components/       Shared site components, charts, and UI primitives
  data/
    genderData.ts   Educational content, indicators, and source records
  hooks/            Shared React hooks
  lib/              Utilities and server error handling
  routes/           File-based pages and root application shell
  router.tsx        Router and per-router query client setup
  server.ts         Server entry and SSR error response handling
  start.ts          TanStack Start configuration
  styles.css        Global styles and design tokens
public/             Static assets, icons, and crawler configuration
```

## Requirements

- [Bun](https://bun.sh/) for dependency installation and project scripts.
- A supported Node.js runtime for local development and deployment. The Vercel Nitro preset
  currently targets Node.js 24.

## Local development

Install dependencies and start the development server:

```sh
bun install
bun run dev
```

Vite prints the local URL when the server starts.

### Available scripts

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `bun run dev`       | Start the local Vite development server.                 |
| `bun run build`     | Create the production build using Nitro's Vercel preset. |
| `bun run build:dev` | Create a build using Vite's development mode.            |
| `bun run preview`   | Preview the production build locally.                    |
| `bun run lint`      | Run ESLint across the project.                           |
| `bun run format`    | Format project files with Prettier.                      |

The production build writes the Vercel Build Output to `.vercel/output`.

## Content and source maintenance

1. Update the appropriate typed record in `src/data/genderData.ts`.
2. Add or update its source record in the `sources` collection, including organization, title,
   year, description, and URL.
3. Use the existing `sourceId` references and source components when displaying sourced content.
4. Preserve each figure's original definition, population, geographic scope, and reference year.
   Do not imply causation from a descriptive comparison.
5. Recheck legal and support-service details against their official sources before publishing.

The data module is the source of truth for most page content. Avoid duplicating citations or
figures in page components when they can be referenced from the shared data.

## Deployment

The project is configured for Vercel in `vercel.json`. To deploy:

1. Import the repository into Vercel.
2. Use Bun for installation (`bun install`) and the project build command (`bun run build`).
3. Deploy the project. Vercel uses the generated `.vercel/output` build.

The Vercel build configuration is managed in `vercel.json`; the Nitro preset is configured in
`vite.config.ts`.
