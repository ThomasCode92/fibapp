# FibApp - An (overcomplicated) Fibonacci Calculator

**FibApp** is a purposefully overengineered, multi-service application created
to **learn, experiment with, and explore** foundational concepts in modern web
development. 🚀

The project integrates essential components such as **databases**, **REST
APIs**, **caching**, **background workers**, and **frontend frameworks**,
providing a comprehensive environment for building, deploying, and scaling
multi-service web applications.

> Much of the inspiration for this project comes from
> _[Docker and Kubernetes - The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide)_
> by Stephen Grider. For those aiming to master \_Docker and Kubernetes, this
> resource is highly recommended.

## Application Overview

![architecture diagram](./images/architecture.excalidraw.png)

- **React Server**: A [React](https://react.dev/) application built with
  [vite](https://vite.dev/) and styled with [Pico CSS](https://picocss.com/).

## Monorepo Setup with Turborepo 📂

The repository is organized as a monorepo using Turborepo to manage multiple
services and projects. Turborepo optimizes builds, reduces redundant tasks, and
streamlines local development. Each service resides in its own package, with
shared configurations and scripts for easier maintenance and scalability.

### Key benefits of using Turborepo

- **Efficient Builds:** Caches and optimizes tasks to speed up development.
- **Unified Management:** Centralizes scripts and dependencies for consistent
  tooling.
- **Scalability:** Easily add new services or utilities without complicating the
  setup.

### Apps and Packages

- `@repo/eslint-config`: `eslint` configurations (includes
  `eslint-plugin-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/vitest-config`: `vitest` configurations, for react and node

This Turborepo has some additional tools already setup:

- [Pnpm](https://pnpm.io/) as the package manager
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io) for code
  quality

## Useful Links

- [Turbo Documentation](https://turbo.build/repo/docs)
- [Turbo API Reference](https://turbo.build/repo/docs/reference)
