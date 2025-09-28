# 📚 Notespace

> **Second Home for Students for boosting Productivity**

Notespace is a comprehensive productivity platform designed specifically for students to organize, manage, and enhance their learning experience. Built with modern web technologies, it provides a unified workspace where students can create, collaborate, and stay productive.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green)](https://orm.drizzle.team/)
[![Development Status](https://img.shields.io/badge/Status-In%20Development-orange)](https://github.com/rohittiwari-dev/notespace)

## 🌐 Live Demo

**🚀 [Try Notespace Live](https://devnotespace.netlify.app/)**

Experience Notespace in action with our live development deployment. Create an account and explore the current features!

> ⚠️ **Note**: Notespace is currently in active development. Some features are complete, while others are planned or in development. See the feature status below for details.

## ✨ Features & Development Status

### ✅ **Completed Features**

#### 🏠 **Workspace Management**

- ✅ **Multi-Workspace Support**: Create and manage multiple workspaces for different subjects or projects
- ✅ **Customizable Organization**: Organize content with tags, colors, and custom icons
- ✅ **Module-Based Structure**: Group related files and content within modules
- ✅ **Trash Management**: Safely delete and restore content with built-in trash functionality

#### 📝 **Rich Content Creation**

- ✅ **Advanced Note Editor**: Powered by BlockNote with rich text editing capabilities
- ✅ **Pages**: Rich text documents with formatting and advanced editing features
- ✅ **Multi-Column Layouts**: Organize content in multiple columns
- ✅ **Code Blocks**: Syntax highlighting for various programming languages
- ✅ **Alerts and Callouts**: Highlight important information
- ✅ **Custom Fonts**: Typography options for better readability
- ✅ **Real-time Auto-save**: Never lose your work with automatic saving

#### 🔐 **User Management & Authentication**

- ✅ **Secure Authentication**: Complete sign-up, sign-in, and password recovery system
- ✅ **User Profiles**: Personalized accounts with avatar support
- ✅ **Account Settings**: Comprehensive user preferences and settings
- ✅ **Email Integration**: Newsletter subscription and email notifications

#### 🌙 **User Experience**

- ✅ **Dark/Light Theme**: Seamless theme switching with system preference detection
- ✅ **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ✅ **Intuitive Navigation**: Smart breadcrumbs and sidebar navigation
- ✅ **Space Switching**: Quick workspace switching with elegant UI
- ✅ **Loading States**: Smooth loading animations and skeleton screens

#### 🛠️ **Technical Foundation**

- ✅ **Real-time API**: Built with tRPC for type-safe API calls
- ✅ **Data Persistence**: PostgreSQL database with Drizzle ORM
- ✅ **File Upload**: Image and file upload with Cloudinary integration

### 🚧 **In Development**

#### 📋 **Task Management**

- 🚧 **Task Boards**: Kanban-style project management system (in active development)
- 🚧 **Task Organization**: Create, assign, and track tasks across boards
- 🚧 **Progress Tracking**: Visual progress indicators and completion status

#### ⏰ **Routine Management**

- 🚧 **Daily Routines**: Schedule and track daily habits and routines (in development)
- 🚧 **Habit Tracking**: Monitor consistency and build productive habits
- 🚧 **Routine Analytics**: Insights into routine completion and patterns

### 📋 **Planned Features**

#### 🎨 **Visual Tools**

- 📋 **Whiteboards**: Digital canvas for creative work and brainstorming
- 📋 **Drawing Tools**: Pen, shapes, sticky notes, and collaborative drawing
- 📋 **Templates**: Pre-built whiteboard templates for different use cases

#### 🧠 **Mind Mapping**

- 📋 **Mind Maps**: Visual thinking and brainstorming tools
- 📋 **Node Connections**: Create complex idea relationships
- 📋 **Export Options**: Save mind maps in various formats

#### 📁 **Document Management**

- 📋 **PDF Support**: Import, annotate, and work with PDF documents
- 📋 **PDF Annotations**: Highlight, comment, and mark up PDFs
- 📋 **Document Viewer**: Built-in PDF viewer with note-taking capabilities

#### 🔄 **Advanced Features**

- 📋 **Real-time Collaboration**: Live editing and collaboration features
- 📋 **Advanced Search**: Full-text search across all content types
- 📋 **Export System**: Export workspaces and content in multiple formats
- 📋 **Offline Support**: Progressive Web App (PWA) capabilities
- 📋 **Mobile App**: Native mobile applications for iOS and Android

### 🎯 **Feature Status Legend**

- ✅ **Completed**: Feature is fully implemented and available
- 🚧 **In Development**: Feature is currently being built
- 📋 **Planned**: Feature is planned for future development

## 🚀 Getting Started

> ⚠️ **Development Status**: Notespace is currently in active development. The core functionality (workspaces, notes, authentication) is stable and ready for use. Features like whiteboards, mind maps, PDF support, and kanban boards are planned or in development.

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/rohittiwari-dev/notespace.git
    cd notespace
    ```

2. **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Fill in your database credentials, Cloudinary keys, and other required environment variables.

4. **Set up the database**

    ```bash
    bun run db:generate
    bun run db:migrate
    ```

5. **Start the development server**

    ```bash
    bun dev
    # or
    npm run dev
    ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses a PostgreSQL database with the following main entities:

- **Users**: Authentication and profile management
- **Workspaces**: Top-level organizational units
- **Modules**: Subject or project-specific containers
- **Files**: Individual content pieces (pages, mind maps, etc.)
- **Authentication**: Secure session management

## 🛠️ Development

### Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint, Markdown, and spell checking
- `bun format` - Format code with Prettier
- `bun typecheck` - Type checking with TypeScript
- `bun db:studio` - Open Drizzle Studio for database management

### Database Management

- `bun run db:generate` - Generate database migrations
- `bun run db:migrate` - Apply database migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open database studio

## 🗺️ Development Roadmap

### 🎯 **Current Focus (Q4 2025)**

- 🚧 **Kanban Task Boards**: Complete implementation of drag-and-drop task management
- 🚧 **Routine Tracking**: Finish daily routine and habit tracking system
- 🚧 **Performance Optimization**: Improve loading times and user experience

### 🔮 **Next Quarter (Q1 2026)**

- 📋 **Whiteboard Implementation**: Start development of digital canvas features
- 📋 **Mind Map Editor**: Begin mind mapping tool development
- 📋 **PDF Integration**: Research and plan PDF support architecture

### 🌟 **Future Releases**

- 📋 **Mobile Applications**: Native iOS and Android apps
- 📋 **Real-time Collaboration**: Live editing and multi-user features
- 📋 **Advanced Analytics**: Usage insights and productivity metrics
- 📋 **API Ecosystem**: Public API for third-party integrations

> 💡 **Want to contribute?** Check our [issues](https://github.com/rohittiwari-dev/notespace/issues) for current development tasks or suggest new features!

## 🤝 Contributing

We welcome contributions from the community! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md) before getting started.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

Security is a top priority for Notespace. If you discover any security vulnerabilities, please review our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

## 📜 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohit Tiwari** - [@rohittiwari-dev](https://github.com/rohittiwari-dev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [BlockNote](https://www.blocknotejs.org/) - Rich text editor
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

- 🐛 [Report Issues](https://github.com/rohittiwari-dev/notespace/issues)
- 💡 [Feature Requests](https://github.com/rohittiwari-dev/notespace/issues)
- 📧 [Contact](https://rohittiwari.me/contact)

---

<div align="center">
  <strong>Made with ❤️ for students worldwide</strong>
  <br>
  <em>Boost your productivity with Notespace</em>
</div>
