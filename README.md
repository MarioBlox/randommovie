# 🎬 Cinematic Discoveries

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts">
</div>

<div align="center">
  <h3>✨ Discover Your Next Favorite Movie or Series ✨</h3>
  <p>A beautifully crafted web application that helps you discover movies and TV series from popular streaming platforms with real-time analytics and user feedback system.</p>
</div>

---

## 🌟 Features

### 🎯 Core Functionality
- **Smart Movie Discovery**: Intelligent recommendation system that suggests movies and TV series based on your preferences
- **Multi-Platform Support**: Integration with major streaming services including Netflix, Prime Video, Disney+, HBO, Apple TV+, and more
- **Dynamic Filtering**: Real-time filtering by streaming platform and content type (movies vs series)
- **Detailed Movie Information**: Comprehensive movie details including cast, ratings, trailers, and streaming availability

### 📊 Analytics Dashboard
- **Real-time Analytics**: Live visitor tracking and engagement metrics
- **Interactive Charts**: Beautiful data visualizations using Chart.js and Recharts
- **User Feedback System**: Comprehensive feedback collection with rating system
- **Live Data Updates**: Real-time data synchronization with Google Sheets integration

### 🎨 User Experience
- **Modern Design**: Sleek, responsive interface with gradient backgrounds and smooth animations
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Mobile Responsive**: Optimized for all device sizes
- **Loading States**: Elegant loading animations and skeleton screens

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- API keys for streaming services and analytics

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cinematic-discoveries.git

# Navigate to project directory
cd cinematic-discoveries

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Streaming Availability API
RAPIDAPI_KEY=your_rapidapi_key_here

# Google Sheets API (for feedback system)
GOOGLE_SHEETS_API_KEY=your_google_api_key_here
GOOGLE_SHEETS_ID=your_spreadsheet_id_here

# Umami Analytics (optional)
UMAMI_WEBSITE_ID=your_umami_website_id
UMAMI_API_TOKEN=your_umami_api_token
```

---

## 📁 Project Structure

```
cinematic-discoveries/
├── components/
│   ├── Chart.js              # Analytics chart component
│   ├── GlobalAnalytics.js    # Global analytics dashboard
│   ├── Loader.js             # Loading animation component
│   ├── MovieCard.js          # Movie information card
│   ├── loading.module.css    # Loading animation styles
│   └── ui/
│       └── card.jsx          # Reusable card component
├── pages/
│   ├── _app.js               # App configuration
│   ├── index.js              # Main landing page
│   └── response.js           # Analytics dashboard page
├── styles/
│   └── globals.css           # Global styles
├── public/
│   └── assets/               # Static assets
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 13+**: React framework with server-side rendering and routing
- **React 18+**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Data Visualization
- **Chart.js**: Flexible charting library for analytics
- **Recharts**: React-specific charting library with responsive design
- **Custom CSS Animations**: Smooth transitions and loading states

### APIs & Services
- **RapidAPI Streaming Availability**: Real-time streaming platform data
- **Google Sheets API**: Feedback collection and data storage
- **Umami Analytics**: Privacy-focused web analytics
- **CountAPI**: Simple visitor counting service

### Styling & UI
- **CSS Modules**: Component-scoped styling
- **Gradient Backgrounds**: Modern visual aesthetics
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Smooth user interactions

---

## 🎯 Key Components

### MovieCard Component
The heart of the application that displays comprehensive movie information including overview, cast, and streaming links. Features tabbed navigation and interactive elements.

### Analytics Dashboard
Real-time analytics system that tracks user engagement, visitor statistics, and provides interactive data visualizations with live updates.

### Feedback System
Comprehensive user feedback collection with multi-criteria rating system, real-time data processing, and beautiful dashboard visualization.

### Loading States
Elegant loading animations with CSS-based bouncing circles and gradient backgrounds that enhance user experience during data fetching.

---

## 📊 Analytics Features

### Real-time Metrics
- Daily, weekly, and monthly visitor counts
- Live user engagement tracking
- Platform usage statistics
- Geographic distribution data

### Interactive Charts
- Radar charts for satisfaction ratings
- Pie charts for demographic data
- Line charts for trend analysis
- Area charts for detailed metrics

### Feedback Analysis
- Multi-dimensional rating system
- Sentiment analysis of text feedback
- Demographic breakdown of responses
- Real-time feedback dashboard

---

## 🎨 Design Philosophy

### Visual Hierarchy
The application employs a carefully crafted visual hierarchy using typography, spacing, and color to guide user attention and create an intuitive navigation experience.

### Color Palette
- **Primary**: Deep purples and indigos for sophistication
- **Secondary**: Bright blues and teals for interactivity
- **Accent**: Vibrant gradients for calls-to-action
- **Neutral**: Transparent whites and grays for content

### Interactive Elements
Every interactive element includes hover states, transitions, and micro-animations to provide immediate feedback and create a premium user experience.

---

## 🔧 Configuration

### API Integration
The application integrates with multiple APIs to provide comprehensive movie data and analytics. Configure your API keys in the environment variables file.

### Streaming Services
Currently supports integration with Netflix, Prime Video, Disney+, HBO Max, Apple TV+, Hulu, Paramount+, Mubi, Starz, Peacock, and Showtime.

### Analytics Setup
Configure your analytics providers in the respective component files. The application supports both Umami Analytics and Google Sheets integration for feedback collection.

---

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Variables
Ensure all environment variables are configured in your deployment platform for proper functionality.

### Performance Optimization
The application is optimized for performance with lazy loading, image optimization, and efficient data fetching strategies.

---

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages
- Include tests for new features

### Issue Reporting
Please use the GitHub Issues template to report bugs or request features. Include detailed information about your environment and steps to reproduce any issues.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🙏 Acknowledgments

- **RapidAPI** for streaming availability data
- **Google Sheets API** for feedback collection
- **Chart.js & Recharts** for data visualization
- **Tailwind CSS** for styling framework
- **Next.js** for the React framework

---

<div align="center">
  <p>Made with ❤️ for movie enthusiasts</p>
  <p>© 2024 Cinematic Discoveries. All rights reserved.</p>
</div>
