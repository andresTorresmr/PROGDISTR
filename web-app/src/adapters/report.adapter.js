export const product_report_Adapter = (product) => ({
  id: product.idProduct,
  name: product.name,
  brand: product.brand,
  sells: product.sells,
});
