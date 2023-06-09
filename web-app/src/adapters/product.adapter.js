export const productAdapter = (product) => ({
  id: product.idProduct,
  name: product.name,
  brand: {
    id: product.idBrand,
    name: product.brand,
  },
  stock: product.stock,
  unitPrice: product.unitPrice,
  sellPrice: product.sellPrice,
  status: product.status,
});
