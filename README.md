# Vue 3 + TypeScript + Supabase Starter Template

A production-ready starter template for building modern web applications with Vue 3, TypeScript, and Supabase authentication. This template includes comprehensive documentation, best practices, and a complete authentication system.

## ⭐ Features

- 🔒 **Complete Auth System**
  - Email/Password authentication
  - Magic link authentication
  - OAuth providers (GitHub, Google, Facebook)
  - Phone authentication with OTP
  - Protected routes
  - Profile management

- 💻 **Modern Stack**
  - Vue 3 with Composition API
  - TypeScript with strict mode
  - Vite for fast development
  - Path aliases for clean imports
  
- 🎨 **Ready-to-Use UI**
  - CSS Variables for theming
  - Responsive design utilities
  - Component-based styles
  - Dark mode support
  - Consistent spacing system

- 📦 **Production Ready**
  - Type-safe API calls
  - Comprehensive documentation
  - Best practices implemented
  - Performance optimized
  - Security focused

## 🚀 Quick Start

1. **Create Your Repository**
   - Click "Use this template" button above
   - Choose a name for your new project
   - Clone your new repository

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Supabase**
   - Create project at https://supabase.com
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set Up Database**
   - Execute SQL scripts from `database` directory in Supabase SQL editor:
     - `schema.sql` for tables and triggers
     - `storage.sql` for avatar storage

5. **Start Development**
```bash
npm run dev
```

## 📚 Documentation

This template includes comprehensive documentation in the `docs/this-project` directory:

- [Project Overview](docs/this-project/project-overview.md) - Structure and setup
- [Template Setup Guide](docs/this-project/template-setup.md) - Complete setup instructions
- [Authentication](docs/this-project/auth.md) - Auth system details
- [Components](docs/this-project/components.md) - Component architecture
- [Styling](docs/this-project/styling.md) - Design system
- [Types](docs/this-project/types.md) - Type system
- [Implementation Details](docs/this-project/implementation-details.md) - Technical details
- [Path Standards](docs/this-project/path-standards.md) - Import standards and patterns

## 🏗️ Project Structure

```
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── composables/     # Vue composables
│   ├── layouts/         # Layout components
│   ├── lib/            # Core services
│   ├── router/         # Route definitions
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   └── main.ts         # Entry point
├── docs/
│   └── this-project/   # Project documentation
└── database/           # SQL setup scripts
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Customization

1. Update project details in `package.json`
2. Modify theme in `src/styles/variables.css`
3. Update content in `src/views/Home.vue`
4. Configure auth providers in Supabase dashboard
5. Add your own components and features

## 🔐 Authentication Features

- Complete email/password flow
- Social authentication
- Magic link login
- Protected routes
- Profile management
- Avatar upload
- Type-safe auth composables

## 🎨 Styling Features

- CSS Variables for theming
- Utility classes
- Component-based styles
- Responsive design
- Dark mode support
- Consistent spacing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This template is [MIT](LICENSE) licensed.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Supabase team for the authentication system
- The community for inspiration and best practices

---

⭐ Star this template if you find it useful!

Need help? Check the [Template Setup Guide](docs/this-project/template-setup.md) or open an issue.
