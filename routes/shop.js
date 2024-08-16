const express = require("express");
const Router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

Router.get("/", shopController.getIndex);

Router.get("/products", shopController.getProducts);

Router.get("/products/:productId", shopController.getProductDetails);

Router.get("/cart", isAuth, shopController.getCart);

Router.post("/cart", isAuth, shopController.postCart);

Router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

Router.get("/checkout", isAuth, shopController.getCheckout);

Router.get("/checkout/success", shopController.getCheckoutSuccess);

Router.get("/checkout/cancel", shopController.getCheckout);

//Router.post("/create-order", isAuth, shopController.postOrder);

Router.get("/orders", isAuth, shopController.getOrders);

Router.get("/orders/:orderId", isAuth, shopController.getInvoice);

// Router.get("/users", (req, res, next) => {
//   console.log('shop file ', adminData.products);
//   res.sendFile(path.join(rootDir, "views", "users.html"));
// });

module.exports = Router;
