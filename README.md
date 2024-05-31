# Chatz

> live version of the app here https://chatz-eta.vercel.app/

## Overview

Chatz is a real-time social media application built with Next.js, utilizing both its frontend and backend capabilities. The app leverages Prisma as an ORM to interact with a MongoDB database. Real-time features are powered by Pusher. Below is a detailed overview of some of the app's features,

## Features

### User Management

- **User Registration and Authentication**: Users can register, log in, and reset their passwords. Email verification is also supported.
- **Profile Management**: Users can update their profile information, including their profile picture, (username, email, profile picture, and other personal details are comming soon).
- **User Roles**: There are two user roles - ADMIN and USER. The default role for new users is USER.

### Social Interactions

- **Friendship**: Users can send, receive, accept, or decline friendship requests. The status of a friendship can be PENDING, ACCEPTED, DECLINED, or BLOCKED.

- **Messaging**: Users can chat with their friends and chats are updated in real-time. (read reciept available but requires refresh)

- **Group chat**: comming soon.

- **Profile**: Users can visit and view other peoples profile but wont see the users post unless they are friends

- **Posts**: Users can create, (edit, and delete comming soon) posts. Posts can contain text content and images.

- **Comments and Replies**: Users can comment on posts and reply to other comments. Comments and replies can be nested infinitely and are updated in real-time.

- **Likes and Shares**: Users can like and share posts. Each like and share is associated with a specific user and post. The like count on posts is updated in real time.

## Getting Started Locally

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm
- An account with Pusher, Cloudinary and Edgstore

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/chatz.git
cd chatz
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_mongodb_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLIENT_URL=http://localhost:3000
EDGE_STORE_SECRET_KEY=your_edge_store_secret_key
EDGE_STORE_ACCESS_KEY=your_edge_store_access_key
AUTH_SECRET=your_auth_secret
NODEMAILER_APP_PASS=your_nodemailer_app_pass
NODEMAILER_EMAIL=your_nodemailer_email
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
```

4. Run the development server:

```sh
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Database Migration

Run the following command to apply database migrations:

```sh
npx prisma migrate dev --name init
```

### Prisma Studio

To view and manage your database, you can use Prisma Studio:

```sh
npx prisma studio
```

## Bug Report

If you encounter any bugs or issues while using Chatz, please report them by following these steps:

1. **Search for existing issues**: Before reporting a new bug, check if it has already been reported in the [issues section](https://github.com/justuche224/chatz/issues).

2. **Create a new issue**: If you do not find an existing issue, create a new one. Provide as much detail as possible, including:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected and actual results.
- Screenshots or videos, if applicable.
- Any relevant logs or error messages.

## Contribution

We welcome contributions to improve Chatz! To contribute, follow these steps:

1. **Fork the repository**: Fork the [Chatz repository](https://github.com/justuche224/chatz) to your GitHub account.

2. **Clone your fork**: Clone the forked repository to your local machine.

```sh
git clone https://github.com/justuche224/chatz.git
cd chatz
```

3. **Create a new branch**: Create a new branch for your feature or bugfix.

```sh
git checkout -b feature/your-feature-name
```

4. **Make your changes**: Implement your feature or bugfix.

5. **Commit your changes**: Commit your changes with a clear and concise commit message.

```sh
git commit -m "Add new feature: your feature description"
```

6. **Push to your branch**: Push your changes to your forked repository.

```sh
git push origin feature/your-feature-name
```

7. **Create a pull request**: Open a pull request to the **Master** repository. Provide a detailed description of your changes and the problem they solve or the feature they add.

We will review your pull request and provide feedback. Once approved, your changes will be merged into the **Master** repository.

## Conclusion

This readme provides an overview of the features of Chatz, a social media application built with Next.js and Prisma, with real-time capabilities powered by Pusher. The app supports a wide range of social interactions, including user management, friendships, posts, comments, likes, shares, and messaging. Each component is designed to work seamlessly together, providing a robust and engaging user experience with real-time updates.
