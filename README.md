# 🛍️ E-Commerce Product Listing App (React Native + Expo Router)

This is a modern mobile e-commerce product listing application built using **React Native**, **Expo Router**, and **TypeScript**. Features a sleek dark theme with red accents, persistent data storage, and a polished user experience.

---

## 📲 Features

### Core Functionality
- ✅ Product listing from FakeStore API with modern grid layout
- ✅ Dedicated product details screen with portrait orientation lock
- ✅ Persistent wishlist using AsyncStorage with context provider
- ✅ Full cart functionality with quantity controls and persistent storage
- ✅ Dynamic tab badges showing cart and wishlist item counts
- ✅ Advanced search with real-time filtering

### UI/UX Enhancements
- ✅ Dark theme with black background and red (#e50914) accent colors
- ✅ Modern bottom-sheet filter modal (category, rating, price sorting)
- ✅ Gradient hero section with integrated search bar
- ✅ Skeleton loading states for smooth user experience
- ✅ Reusable UI components (AppButton, ProductCard, FilterModal)
- ✅ Vertical content centering on product details screen
- ✅ Custom back button with proper navigation

### Technical Features
- ✅ File-based routing with Expo Router
- ✅ Context API for state management (Cart & Wishlist)
- ✅ TypeScript for type safety
- ✅ Screen orientation control
- ✅ AsyncStorage for data persistence
- ✅ Component-based architecture

---

## 🔧 Tech Stack

- **React Native** - Mobile app framework
- **Expo + Expo Router** - Development platform and navigation
- **TypeScript** - Type-safe JavaScript
- **AsyncStorage** - Local data persistence
- **Context API** - State management
- **expo-linear-gradient** - Gradient backgrounds
- **expo-screen-orientation** - Orientation control
- **@react-native-picker/picker** - Filter dropdowns
- **FakeStore API** - Product data source

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator / Android Emulator or physical device

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shiv989898/E-Commerce
   cd E-Commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

---

## 🎯 API Integration

- **Data Source**: [FakeStore API](https://fakestoreapi.com/)
- **Endpoints Used**:
  - `GET /products` - Fetch all products with filtering support
  - `GET /products/{id}` - Fetch single product details
  - `GET /products/categories` - Fetch categories for filter options

---

## 📁 Project Structure

```
E-Commerce/
├── 📱 app/                          # App routing and screens
│   ├── _layout.tsx                  # Root layout with navigation config
│   ├── +not-found.tsx               # 404 error screen
│   ├── (tabs)/                      # Tab navigation group
│   │   ├── _layout.tsx              # Tab layout with providers and badges
│   │   ├── index.tsx                # Home screen with product grid
│   │   ├── Cart.tsx                 # Shopping cart screen
│   │   ├── wishlist.tsx             # Wishlist screen
│   │   └── explore.tsx              # Explore/discovery screen
│   └── details/
│       └── [id].tsx                 # Dynamic product details screen
├── 🎨 components/                   # Reusable UI components
│   ├── ProductCard.tsx              # Product grid item component
│   ├── ProductDetails.tsx           # Product detail view component
│   ├── ui/                          # Modern UI components
│   │   ├── AppButton.tsx            # Reusable button with variants
│   │   └── FilterModal.tsx          # Bottom-sheet filter modal
│   └── Themed*.tsx                  # Theme-aware components
├── 🎯 context/                      # State management
│   ├── CartContext.tsx              # Persistent cart state with AsyncStorage
│   └── WishlistContext.tsx          # Persistent wishlist state with AsyncStorage
├── 🎨 constants/
│   └── Colors.ts                    # Dark theme color tokens
├── 🔧 hooks/                        # Custom React hooks
└── 📦 assets/                       # Static assets (images, fonts)
```

---

## 💡 Key Features & Implementation

### Dark Theme with Red Accents
- Consistent black (#000000) background across all screens
- Red (#e50914) accent color for interactive elements
- Centralized color system in `constants/Colors.ts`

### Persistent Data Storage
- **Wishlist**: AsyncStorage with Context API for persistent favorites
- **Cart**: AsyncStorage with quantity management and persistent shopping cart
- **State Sync**: Real-time synchronization between storage and UI

### Modern UI Components
- **FilterModal**: Bottom-sheet style modal with category, rating, and price sorting
- **AppButton**: Reusable button component with primary/secondary variants
- **ProductCard**: Optimized grid layout with wishlist toggle and add-to-cart
- **Dynamic Badges**: Tab navigation with real-time cart and wishlist counts

### Navigation & UX
- File-based routing with Expo Router for clean navigation
- Portrait orientation lock on product details screen
- Vertical content centering for optimal viewing
- Custom back navigation with proper screen transitions

---

## 🛠️ Technical Highlights

- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management without external libraries
- **AsyncStorage**: Persistent data storage for cart and wishlist
- **Component Architecture**: Modular, reusable UI components
- **Performance**: Optimized rendering with proper state management
- **Error Handling**: Graceful error states and loading indicators

---

## 📸 Screenshots

> ![WhatsApp Image 2025-04-05 at 01 12 54_2c17086a](https://github.com/user-attachments/assets/b2cbe0c4-0f27-4416-8aca-157df8501851)
> ![WhatsApp Image 2025-04-05 at 01 12 55_9efff02c](https://github.com/user-attachments/assets/731eabde-06d5-4e28-bfc0-8699ceced5f7)
>![WhatsApp Image 2025-04-05 at 01 12 54_4e4b9b4a](https://github.com/user-attachments/assets/badc60ad-89c1-4a99-a166-380a78632da1)
> ![WhatsApp Image 2025-04-05 at 01 12 54_b621d12c](https://github.com/user-attachments/assets/82c73175-b4e1-4b74-8862-b3026a1db1e7)

---

## 🙋‍♂️ Author

**Shiv Goyal**  
📧 shivgoyal9988@gmail.com  
🔗 [GitHub Profile](https://github.com/shiv989898)

---
