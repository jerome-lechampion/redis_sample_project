const redis = require("redis");
const client = redis.createClient();
const products = require("./products.json");

// Liste de produits
// Une entrée par produit (id produit => information produit)
// Ids de produits par brandName

// const redis = {
//   [`product:${productId}`]: productInformations,
//   [`brand:${brandName}`]: [productIds],
// };

const ingestProducts = () =>
  new Promise((res) => {
    const batch = client.multi();

    products.forEach((product) => {
      batch
        .hset(`product:${product.MAT_NUM}`, Object.entries(product).flat())
        .sadd(`brand:${product.MAT_DESC.split(" ")[0]}`, product.MAT_NUM);
    });

    batch.exec((err, reply) => {
      res(reply);
    });
  });

const main = async () => {
  const result = await ingestProducts();
};

main();
