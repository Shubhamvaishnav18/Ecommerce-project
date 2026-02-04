import express from "express";
import upload from "../middlewares/upload.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  togglePublish,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.array("images"), createProduct);
router.get("/", getProducts);
router.put("/:id", upload.array("images"), updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/publish", togglePublish);

export default router;
