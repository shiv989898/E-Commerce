# 🛍️ E-Commerce Product Listing App (React Native + Expo Router)

This is a mobile e-commerce product listing application built using **React Native**, **Expo Router**, and **TypeScript**, designed as part of a frontend development assignment for Simplify Money.

---

## 📲 Features

- ✅ Product listing from FakeStore API
- ✅ Product details page with image, description, price, and rating
- ✅ Wishlist functionality (toggle using heart icon)
- ✅ Add to Cart (with persistent cart using AsyncStorage)
- ✅ Bottom Tab Navigation (Home, Wishlist, Cart)
- ✅ Search functionality
- ✅ Filter by category, rating
- ✅ Sort by price (low to high / high to low)
- ✅ State management via Context API
- ✅ Responsive and clean UI

---

## 🔧 Tech Stack

- **React Native**
- **Expo + Expo Router**
- **TypeScript**
- **AsyncStorage**
- **Context API**
- **FakeStore API**

---

## ▶️ How to Run

1. Clone the repository:

```bash
git clone https://github.com/shiv989898/E-Commerce
cd E-Commerce
```
2. Install dependencies:

```bash
npm install
```

3. Start the project:

```bash
npx expo start
```

You can open the app using:

- 📱 **Expo Go** on a physical device (scan QR)
- 🖥️ **Android/iOS Emulator**
- 💻 **Web browser** for quick UI testing

---

## 🗂️ File Structure

```bash
E-Commerce/
├── app/
│   ├── index.tsx           # Home screen with product listing, search, filters
│   ├── details/[id].tsx    # Product details screen
│   ├── wishlist.tsx        # Wishlist page
│   ├── cart.tsx            # Cart page
│   ├── _layout.tsx         # App layout with tab navigation
├── context/
│   ├── CartContext.tsx     # Cart state management (add, remove, clear)
├── assets/                 # Static assets
├── app.json                # Expo config
├── package.json            # Project dependencies
```

---

## 💡 My Approach

- The app uses **Expo Router** for file-based navigation, allowing clean screen routing.
- Product data is fetched dynamically from **FakeStore API**.
- Cart and wishlist data are managed globally using **Context API**.
- Cart is persisted using **AsyncStorage** for a seamless user experience.
- The app supports **filtering by category/rating**, and **sorting by price**, providing a complete shopping experience.
- The UI is clean, minimal, and responsive.

---

## 🚧 Challenges & Notes

- Category strings from the API are not prettified (e.g., lowercase). They’re shown as-is.
- Product quantity logic in the cart is not yet implemented — current cart assumes 1 quantity per item.
- All features were implemented without third-party state libraries, to keep the app lightweight and easy to maintain.
- Cart and Wishlist states reset when the app is restarted unless saved — cart is persisted, wishlist is not.

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

## 📬 Submission Notes for Simplify Money

- This project is submitted in response to the **React Frontend assignment** for the Software Engineering Internship at Simplify Money.
- Please refer to this GitHub repository for the complete source code and documentation.
- All instructions to run the project are included above.
- Bonus features like wishlist, search, filtering, and sorting are also implemented.
- No known unresolved bugs — the app is stable and runs as expected.
