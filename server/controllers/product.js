const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
  try {
    // รับข้อมูลจาก body และกำหนด default ให้ images เป็น array ว่าง
    const {
      title,
      description,
      price,
      quantity,
      categoryId,
      images = [],
    } = req.body;

    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: categoryId ? parseInt(categoryId) : null,
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    // code
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.read = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const products = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const {
      title,
      description,
      price,
      quantity,
      categoryId,
      images = [],
    } = req.body;

    // clear image
    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: categoryId ? parseInt(categoryId) : null,
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    // 1. ค้นหาสินค้าพร้อมรูปภาพ
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    // 2. ลบรูปภาพใน Cloudinary
    if (product.images.length > 0) {
      const deleteImagePromises = product.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      );
      await Promise.all(deleteImagePromises);
    }

    // 3. ลบข้อมูลที่ผูกอยู่เพื่อป้องกัน P2003 (กรณีไม่ได้ตั้ง Cascade ใน DB)
    await prisma.productOnCart.deleteMany({ where: { productId } });

    // 4. ลบสินค้า
    await prisma.product.delete({
      where: { id: productId },
    });

    res.send("Delete Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listby = async (req, res) => {
  try {
    // code
    const { sort, order, limit } = req.body;
    console.log(sort, order, limit);
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: {
        [sort]: order,
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ========== Handler ==========
const handleQuery = async (query) => {
  return prisma.product.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    include: {
      category: true,
      images: true,
    },
  });
};

const handlePrice = async (priceRange) => {
  return prisma.product.findMany({
    where: {
      price: {
        gte: parseFloat(priceRange[0]),
        lte: parseFloat(priceRange[1]),
      },
    },
    include: {
      category: true,
      images: true,
    },
  });
};

const handleCategory = async (categoryIds) => {
  return prisma.product.findMany({
    where: {
      categoryId: { in: categoryIds.map((id) => Number(id)) }, // ✅ รองรับ array เช่น [1,4]
    },
    include: {
      category: true,
      images: true,
    },
  });
};

// ========== Search Filters ==========
exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    let where = {};

    // ถ้ามีคำค้นหา
    if (query) {
      where.title = { contains: query };
    }

    // ถ้ามีการเลือกหมวดหมู่ (รับมาเป็น Array)
    if (category && category.length > 0) {
      where.categoryId = { in: category.map((id) => Number(id)) };
    }

    // ถ้ามีการระบุช่วงราคา [min, max]
    if (price && price.length === 2) {
      where.price = {
        gte: parseFloat(price[0]),
        lte: parseFloat(price[1]),
      };
    }

    const products = await prisma.product.findMany({
      where: where,
      include: {
        category: true,
        images: true,
      },
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createImages = async (req, res) => {
  try {
    //code
    // console.log(req.body)
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `nemeow-${Date.now()}`,
      resource_type: "auto",
      folder: "online-store",
    });
    res.send(result);
  } catch (err) {
    //err
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.RemoveImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).send("Public ID is required");

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok" || result.result === "not found") {
      res.send("Remove Image Success");
    } else {
      res.status(400).send("Remove Image Failed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
