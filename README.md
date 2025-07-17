## Requirements

To run this project, ensure you have the following installed on your system:

- **Yarn:** Version `1.22.19`
- **Node.js:** Version `>= 22`
- **Git:** Latest version
- **VS Code** (recommended) with the following extensions:
  - ESLint
  - Prettier
  - GitLens
  - Turbo Console Log

## Project Setup

### Initial Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd onesky-monorepo
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Fill in the required environment variables

### Development Workflow

1. Always create a new branch from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit following conventional commits:

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug in login"
   git commit -m "docs: update README"
   ```

3. Push your branch and create a Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

## Branching Strategy

### Branch Types

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes
- `release/*` - Release preparation

### Branch Naming Convention

- Features: `feature/description-of-feature`
- Bug fixes: `bugfix/issue-description`
- Hotfixes: `hotfix/issue-description`
- Releases: `release/v1.0.0`

### Merge Strategy

1. All changes must be reviewed through Pull Requests
2. Require at least one approval before merging
3. All CI checks must pass
4. Squash and merge for feature branches
5. Create merge commits for hotfixes

## CI/CD Pipeline

### Continuous Integration

1. **Pre-commit Hooks**
   - Linting
   - Type checking
   - Unit tests
   - Format checking

2. **Pull Request Checks**
   - Build verification
   - Test suite execution
   - Code coverage reports
   - Security scanning

### Continuous Deployment

1. **Staging Environment**
   - Automatic deployment on merge to `develop`
   - Integration testing
   - Performance testing

2. **Production Environment**
   - Manual approval required
   - Blue-green deployment
   - Rollback capability

## Running the Application

There are two ways to run the application, depending on whether you want to run the web version or the mobile version.

### Web Development

1. From the project's root directory, start the development server:
   ```bash
   yarn dev
   ```
   This command will typically start a local development server, and the application will be accessible in your web browser (usually at `http://localhost:3000` or a similar address).

### Mobile Development

1. Navigate to the mobile application's directory:

   ```bash
   cd app/onesky-app
   ```

2. Start the mobile development server:
   ```bash
   yarn dev
   ```

## New Developer Onboarding

1. **Prerequisites**
   - Complete the development environment setup
   - Request access to necessary repositories and tools
   - Set up SSH keys for Git

2. **First Week Tasks**
   - Review project documentation
   - Set up local development environment
   - Complete a small bug fix or feature
   - Attend team standups and planning meetings

3. **Required Tools**
   - VS Code with recommended extensions
   - Postman for API testing
   - Docker for containerization
   - Git for version control
   - Slack for communication
   - Jira for task management

4. **Documentation**
   - Review API documentation
   - Study architecture diagrams
   - Understand coding standards
   - Familiarize with testing procedures

## Support

For any questions or issues:

1. Check the project documentation
2. Ask in the team Slack channel
3. Create an issue in the repository
4. Contact the team lead
