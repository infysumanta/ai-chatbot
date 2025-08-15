**Fork and Deploy to Vercel**

- Forked the GitHub repository to my personal account and linked it to the Vercel project.
- Added the required environment variables from various source providers as documented.
- Deployed successfully without any issues.

**Adding a New AI Provider**

- Reviewed the existing implementation for reasoning and non-chat models to understand the structure.
- Followed the same pattern to integrate a new chat AI model (OpenAI GPT-4o).
- Updated the model provider, API, and validation logic to support the new model.

**Admin Cost Dashboard**

- Implemented role-based access control by adding a `role` field in the database, with two roles: `user` and `admin`.
- Restricted admin portal access to only admin users via layout handlers and middleware.
- Added a top navigation bar with options to log out or switch to the chat window, and included an "Admin Dashboard" button in the user dropdown menu (visible only to admins).
- From AI provider responses, extracted token usage details (input, output, total tokens, and model used) and stored them along with the chat message in the database.
- Created a table to display per-chat total token usage by chat ID and by model, along with additional stats such as total users, total chats, total messages, and total tokens used.

**Voice Input**

- Added a microphone button next to the attachment icon.
- On click, opened an audio recorder to capture voice input.
- On completion, sent the audio to a new transcription API route.
- Once transcription was complete, automatically updated the input box with the transcribed text.
