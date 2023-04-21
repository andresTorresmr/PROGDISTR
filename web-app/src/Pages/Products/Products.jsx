import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useFetchAndLoad } from "../../hooks";
import { get_brands, get_products } from "../../services";
import Loading from "../Loading/Loading";
import { brandAdapter, productAdapter } from "../../adapters";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddProductModal from "./Modals/AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import UpdateProductModal from "./Modals/UpdateProductModal";
import DeleteProductModal from "./Modals/DeleteProductModal";
import SearchIcon from "@mui/icons-material/Search";
import { setProductState } from "../../redux/states/product.state";

const Products = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [product, setProduct] = useState({});
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = React.useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [brandValue, setBrandValue] = React.useState("");
  const products_item = useSelector((state) => state.products);
  const [product_search, setProductSearch] = useState(
    useSelector((state) => state.products)
  );
  const [productTable, setProductTable] = useState([]);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleCharge();
  }, []);

  const handleCharge = async () => {
    let products;
    let brands;
    try {
      const { data } = await callEndpoint(get_products());
      const brand = await callEndpoint(get_brands());
      products = data;
      brands = brand.data;

      brands.map((brand, index) => {
        brands[index] = brandAdapter(brand);
      });

      products.map((product, index) => {
        products[index] = productAdapter(product);
      });

      dispatch(setProductState(products));
      setProductSearch(products);
      setProductTable(products);

      brands = brands.filter((item) => item.status == 1);

      setBrands(brands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (product) => {
    let data;
    data = product;
    setProduct(data);
    setStatus(data.status);
    setBrandValue(data.brand.id);
    setOpenUpdate(true);
  };

  const handleDelete = async (id) => {
    // console.log(id);
    setId(id);
    setOpenDelete(true);
  };

  const handleChange = (e) => {
    //console.log(products_item);
    setSearch(e.target.value);
    filter(e.target.value);
    //console//.log(product_search);
  };
  const filter = (searchTerm) => {
    var searchResult = productTable.filter((element) => {
      if (
        element.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        element.brand.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
    setProductSearch(searchResult);
  };
  return (
    <>
      <AddProductModal open={open} setOpen={setOpen} brands={brands} />
      <UpdateProductModal
        brands={brands}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        product={product}
        status={status}
        setStatus={setStatus}
        brandValue={brandValue}
        setBrandValue={setBrandValue}
      />
      <DeleteProductModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        id={id}
      />
      <Typography variant="h3" component="h1" className="text-center my-5 ">
        Productos
      </Typography>
      <Box className="flex items-center justify-between mx-10">
        <Button
          variant="contained"
          className="mt-5 mb-8 bg-slate-700 "
          endIcon={<AddCircleIcon />}
          onClick={() => setOpen(true)}
        >
          Agregar producto
        </Button>
        <Box className=" items-end  h-[30px] mb-2 text-slate-700 hidden">
          <SearchIcon sx={{ mr: 1, my: 0.5 }} />
          <TextField
            id="searchProduct"
            label="Buscar"
            variant="standard"
            onChange={handleChange}
          />
        </Box>
      </Box>
      {loading && products_item ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Marca</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Precio unitario</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products_item.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {product.id}
                  </TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.brand.name}</TableCell>
                  <TableCell align="center">
                    {product.stock == 0 ? (
                      <span>Sin stock</span>
                    ) : (
                      <span>{product.stock}</span>
                    )}
                  </TableCell>
                  <TableCell align="center">${product.unitPrice}</TableCell>
                  <TableCell align="center">
                    {product.status == 1 ? (
                      <span className="stock">Activo</span>
                    ) : (
                      <span className="out-stock">Inactivo</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="update"
                      onClick={() => handleUpdate(product)}
                    >
                      <EditIcon className=" hover:text-yellow-400 text-slate-600" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon className=" hover:text-red-500 text-slate-600" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Products;
