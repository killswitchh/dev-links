# Dev Links

Dev Links is a web application focused on developers, designed to help them showcase multiple links in a single place. Similar to Linktree and Kofi, Dev Links allows users to create a custom page with their choice of links and customize the button shape, color, and background color and gradient. Users can also upload a header image that will be displayed at the top of the page.

What sets Dev Links apart from competitors like Linktree and Kofi are the following features:

- Users can create up to three links, as opposed to one allowed by competitors.
- For developer-related links (e.g. GitHub), users can display more details such as followers count and repository count, making it easier to showcase more on the list page itself.
- Enhanced links are currently supported only for GitHub, but more providers will be added soon.

## Key Features

- One-click sign-in with Github
- Create a custom page with up to three links
- Customize button shape and color
- Customize background color and gradient
- Enhanced links for Github profiles that display additional details such as followers and repository count
- More providers will be added soon
- All authentication is done on the server, away from the client browser.

## Technical Details

- The application was developed using SvelteKit, making use of edge functions and server-side rendering wherever possible.
- We utilized Supabase for user authentication and Prisma as the ORM to store data in MongoDB Atlas.
- The project is entirely written in TypeScript and uses Zod for validation.
- We used community-made packages such as SvelteKit Superforms for proper form validation.
- The app is deployed on Vercel with integrations with Axiom for observability.

## Demo Video

Please watch our [demo video](https://clipchamp.com/watch/kddzJ041PPC) for a quick overview of the application's features.

## Getting Started

To get started, simply head to https://devlinks.pro and sign in with your Github account. Once signed in, you can create a custom page and start adding links.

## License

Dev Links is licensed under the MIT License. See the LICENSE file for more information.

## Contributing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm i
npm run dev
npx prisma generate
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
