import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      quantity,
      mrp,
      sellingPrice,
      brand,
      exchangeEligible,
    } = req.body;

    // extract image paths
    const images = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const product = await Product.create({
      name,
      type,
      quantity,
      mrp,
      sellingPrice,
      brand,
      exchangeEligible:
        exchangeEligible === "true" ||
        exchangeEligible === true,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product creation failed" });
  }
};


export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      quantity,
      mrp,
      sellingPrice,
      brand,
      exchangeEligible,
      existingImages = [],
    } = req.body;

    let images = Array.isArray(existingImages)
      ? existingImages
      : existingImages
      ? [existingImages]
      : [];

    // add new images
    if (req.files && req.files.length > 0) {
      images = images.concat(
        req.files.map((file) => file.filename)
      );
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        quantity,
        mrp,
        sellingPrice,
        brand,
        exchangeEligible:
          exchangeEligible === "true" ||
          exchangeEligible === true,
        images,
      },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};



export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

export const togglePublish = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.published = !product.published;
  await product.save();
  res.json(product);
};
