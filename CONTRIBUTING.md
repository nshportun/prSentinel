# Contributing to PR Sentinel

Thank you for your interest in contributing! This document outlines how you can help.

## Code of Conduct

We enforce the [Contributor Covenant](CODE_OF_CONDUCT.md) to ensure a welcoming, inclusive community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/pr-sentinel.git`
3. Install dependencies: `npm install`
4. Run tests: `npm test`
5. Create a feature branch: `git checkout -b feature/your-feature`

## Development

- Write TypeScript code with strict type checking enabled
- Maintain test coverage at 85% or higher
- Run `npm test` before committing
- Format code with `npm run lint`

## Submitting Changes

1. Commit with clear, descriptive messages
2. Push to your fork
3. Open a pull request against `main`
4. Link any related issues
5. Provide a clear description of your changes

## Issue Guidelines

- Search existing issues first
- Be specific and provide reproduction steps
- Include relevant logs, error messages, and environment details
- Use the provided issue templates

## ML/Data Checks Focus

We prioritize contributions that:
- Improve PII/secret detection accuracy
- Add dataset quality validation
- Handle new data formats (Parquet, Protocol Buffers, etc.)
- Support additional model providers
- Enhance schema drift detection

## Licensing

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.
