# ogfundz__muskys-agent

This is an [eve](https://eve.dev) agent bootstrapped with [`eve init`](https://eve.dev/docs/reference/cli#eve-init).

## Getting started

First, run the development server:

```bash
eve dev
```

The development TUI opens an interactive session where you can send messages to your agent.

Start by editing `agent/instructions.md` to define the agent's identity, purpose, tone, and response guidelines. Configure its model and runtime behavior in `agent/agent.ts`.

Add capabilities under `agent/`, including tools, connections, channels, skills, subagents, and schedules. eve reloads your changes as you work.

## Learn more

To learn more about eve, explore these resources:

- [eve documentation](https://eve.dev/docs) — learn about eve's features and authoring APIs.
- [Build an Agent tutorial](https://eve.dev/docs/tutorial/first-agent) — build and deploy an agent step by step.
- [eve on GitHub](https://github.com/vercel/eve) — view the source and contribute.

## Deploy on Vercel

Deploy your agent to [Vercel](https://vercel.com) from the project root:

```bash
eve deploy
```

`eve deploy` links a Vercel project if needed and deploys the agent to production. See the [eve deployment documentation](https://eve.dev/docs/guides/deployment/vercel) for authentication, environment variables, and deployment options.


## OGFUNDZMUSKY AI Studio v3.0

The Agent_Stu image-editing studio is available at **/studio/** after deployment. It is preserved as a standalone static app under `public/studio/index.html`, so the existing Eve agent homepage and authored files remain unchanged.

### Included studio features

- Image upload, drag-and-drop, canvas preview, zoom, and PNG export
- Manual brightness, contrast, saturation, sepia, hue, blur, rotate, and flip controls
- Undo/redo, original-image comparison, starter scenes, and local project gallery
- Gemini image generation/editing and a canvas-aware copilot chat, routed through server-side API handlers
- Optional Firebase email/password and Google authentication when Firebase runtime configuration is supplied; otherwise guest workspace mode

### Deployment configuration

Set `GEMINI_API_KEY` as a server-side deployment secret. Optional model overrides: `GEMINI_IMAGE_MODEL` and `GEMINI_TEXT_MODEL`. The API routes are `/api/studio/image` and `/api/studio/chat`. Never put provider keys in the HTML or in a `NEXT_PUBLIC_*` variable.

Firebase authentication requires a valid Firebase web configuration and enabled Google/email-password providers. Without that configuration, the studio offers guest workspace mode; email/password and Google authentication are not backed by a production identity provider.

This feature branch preserves the existing root route and Eve agent code. It is prepared for review and deployment; no production deployment has been triggered.
