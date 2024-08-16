

# Online Shop Application 👾

This is a  functional online shop application built using Express.js, EJS templates, and MongoDB as the database. The application supports user authentication, product management, shopping cart functionality, PDF invoice generation, and payment processing with Stripe. Additionally, it includes features like password reset via email using SendGrid.

## Features

- **User Authentication**: Sign up, log in, and reset password functionality using email verification.
- **Product Management**: Admins can add, edit, and delete products.
- **Shopping Cart**: Users can add products to their cart, update quantities, and proceed to checkout.
- **Payment Processing**: Integrated with Stripe for secure payment processing.
- **PDF Invoice Generation**: Generate and download PDF invoices for orders.
- **CSRF Protection**: Implemented to secure forms from CSRF attacks.
- **Error Handling**: Robust error handling with user-friendly messages.
- **Secure Sessions**: User sessions are managed securely with cookies.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/victoriababala/nodeShop.git
   cd nodeShop
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=your_mongo_db_connection_string
   SESSION_SECRET=your_session_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:2000`.

## Usage

### Sign Up & Login
- Users can sign up with an email and password.
- Users can log in after confirming their email.

### Password Reset
- Users can reset their password by providing their registered email.
- An email with a password reset link will be sent to the user.

### Shopping Cart
- Users can add products to the cart from the shop page.
- Cart details can be viewed, updated, or cleared.
- Proceed to checkout to enter payment details via Stripe.

### Admin Features
- Admins can add new products, edit existing ones, or delete products.
- Manage orders and view order history.



