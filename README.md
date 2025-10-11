# 🍽️ QR Menu App

> Because nobody likes touching greasy paper menus anymore, and restaurants hate reprinting them every time prices change.

A full-stack web app that lets restaurants create beautiful digital menus accessible via QR codes. Built this during my final year to learn modern web dev and solve an actual problem I saw at local cafes.

## 🎬 Live Demo

**Check it out:** https://scandine-beta.vercel.app/

**Try it yourself:**
- Create an account
- Build a menu with different sections (Appetizers, Mains, etc.)
- Pick a theme (I've got Minimalist ready, Classic Black is coming soon)
- Generate a QR code
- Scan it and see your menu live!

## 📸 What It Looks Like

[Screenshot 1: Menu Editor]
*The editor where you add your menu items*

[Screenshot 2: Minimalist Theme Preview]
*Clean minimalist design - perfect for modern cafes*

[Screenshot 3: QR Code Generation]
*Generate and download QR codes for your menu*

[Screenshot 4: Mobile View]
*How customers see it on their phones*

## 💡 Why I Built This

Was at a cafe last year and watched the owner manually updating menu prices with a marker. Thought "there's gotta be a better way." Plus, I wanted to learn Next.js and TypeScript beyond just tutorials.

Turned out to be way more complex than I expected (auth, file uploads, multiple themes, responsive design) but learned a ton.

## ✨ Features

### What's Working:
- 🔐 **User Authentication** - Sign up, login, JWT-based auth
- 📝 **Menu Builder** - Add sections, items, descriptions, prices
- 🎨 **Multiple Themes** - Minimalist theme fully ready
- 📸 **Image Uploads** - Compress and upload images (Cloudinary)
- 📱 **QR Code Generator** - Generate QR codes for your menu
- 💾 **Save & Edit** - Create multiple menus, edit anytime
- 📱 **Fully Responsive** - Works on all devices

### Work in Progress:
- 🎨 Classic Black theme (80% done, layout patterns ready)
- 📊 Analytics (planned)
- 🌐 Multi-language support (planned)

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript (because I like knowing what my variables are)
- Tailwind CSS (utility classes ftw)
- Redux Toolkit (though I used some localStorage too - planning to refactor)

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- JWT for auth
- Multer for file uploads

**Other Cool Stuff:**
- Cloudinary for image hosting
- Browser Image Compression (images get heavy fast)
- React Icons, Lucide Icons
- QR Code generation

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account (free tier works)

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# PORT=5000
# DB_STRING=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# FRONTEND_SERVICE=http://localhost:3000

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local with:
# NEXT_PUBLIC_SERVER=http://localhost:5000/api

npm run dev
```

Visit `http://localhost:3000` and you're good to go!

## 📁 Project Structure

```
qr-menu-app/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Auth middleware
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── app/         # Next.js pages
    │   ├── components/  # React components
    │   │   ├── designs/       # Theme previews
    │   │   ├── menuComponents/ # Menu builder
    │   │   └── ui/            # Reusable UI
    │   ├── redux/       # State management
    │   └── types/       # TypeScript types
    └── public/          # Static assets
```

## 🎨 Themes Explained

### Minimalist (Live)
Clean, simple, straightforward. Each section shows a title, items with descriptions and prices, and optional image at the bottom. Perfect for cafes and quick-service restaurants.

### Classic Black (In Progress)
More sophisticated with dynamic layouts. Different sections get different visual treatments:
- Some sections: image on right, items on left
- Others: images on top, items below
- Automatically mirrors pattern for visual interest

The layout engine is done, just polishing the UI.

## 🤔 What I Learned

**Technical:**
- Next.js App Router (different from Pages Router, had to relearn routing)
- TypeScript integration (fought with types a lot initially)
- File upload flow (harder than it looks!)
- JWT authentication (implementing it yourself vs using Auth0)
- MongoDB schema design with Maps (for efficient section lookups)
- Image optimization (users upload 5MB photos, can't store those as-is)

**Non-Technical:**
- Breaking features into smaller tasks
- Figuring out when to refactor vs move forward
- Designing for mobile-first (restaurants = mobile users)
- Balancing perfectionism with shipping

## 🐛 Known Issues

Being honest about what needs work:
- Using localStorage in some places (planning to move everything to Redux)
- Classic Black theme incomplete (functional but needs polish)
- Need better loading states in some places

## 🔮 What's Next

Things I want to add:
- [ ] Complete Classic Black theme
- [ ] Analytics dashboard (views, popular items)
- [ ] PDF export for print menus
- [ ] Multi-language support
- [ ] Table ordering integration (ambitious but would be cool)
- [ ] Refactor state management properly
- [ ] Add tests (probably start with API tests)

## 🤝 Want to Contribute?

This is a learning project but I'm open to feedback! If you spot bugs or have ideas:
- Open an issue
- Submit a PR
- Just DM me your thoughts

No contribution is too small - even typo fixes help.


## 📝 License

MIT - Use it however you want. If you build something cool with it, let me know!

--

**Built with ☕ and determination during college**

*P.S. - If you're a recruiter reading this, yes I'm available for internships/full-time roles! 😄*
