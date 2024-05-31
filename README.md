# Chatz

> live version of the app here https://chatz-eta.vercel.app/

### Overview

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
