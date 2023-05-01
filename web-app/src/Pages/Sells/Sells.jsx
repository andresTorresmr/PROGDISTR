import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchAndLoad } from "../../hooks";
import {
  get_brands,
  get_methods,
  get_products,
  get_sells,
  insert_sell,
} from "../../services";
import { brandAdapter, methodAdapter, productAdapter } from "../../adapters";
import {
  setProductState,
  updateProduct,
} from "../../redux/states/product.state";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import VisibilityIcon from "@mui/icons-material/Visibility";

import styled from "@emotion/styled";
import {
  setNullSell,
  setSellItem,
  deleteSellItem,
  updateSellItem,
} from "../../redux/states/sell.state";
import { setAccountState } from "../../redux/states/account.state";
import { useSnackbar } from "notistack";

const Sells = () => {
  const products = useSelector((state) => state.products);
  const sellItems = useSelector((state) => state.sells);
  const [methods, setMethods] = useState([]);
  const { loading, callEndpoint } = useFetchAndLoad();
  const [value, setValue] = useState("");
  const [tableValue, setTableValue] = useState("");
  const item = useRef();
  const platform_id = useRef();
  const quantity = useRef();
  const dispatch = useDispatch();
  const [brandValue, setBrandValue] = React.useState("");
  const [platformValue, setPlatformValue] = React.useState("");
  const accounts = useSelector((state) => state.accounts);
  const [pStock, setProductStock] = useState(0);
  const paysWith = useRef();
  const [paysValue, setPaysValue] = useState("");
  const [changeValue, setChangeValue] = useState("");
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleCharge();
    handleSells();
  }, []);

  const deleteitem = (item) => {
    let product;
    let metadata;

    let findBrand = products.find((Brand) => Brand.id === item.id);

    if (findBrand) {
      let index = products.indexOf(findBrand);
      product = products[index];

      let newStock = parseInt(product.stock) + parseInt(item.quantity);

      product = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        stock: newStock,
        sellPrice: product.sellPrice,
        status: product.status,
      };

      console.log(item);
      dispatch(updateProduct(product));
      dispatch(deleteSellItem(item.id));
      //setTableValue(quantity.current.value);
    }
  };

  const handleSells = async () => {
    const sells = await callEndpoint(get_sells());
    dispatch(setAccountState(sells.data));
    setChangeValue("");
  };

  const handleCharge = async () => {
    let products;
    let brands;
    let platformsData;

    try {
      const { data } = await callEndpoint(get_products());

      const brand = await callEndpoint(get_brands());
      const platforms = await callEndpoint(get_methods());

      products = data;
      brands = brand.data;
      platformsData = platforms.data;

      brands.map((brand, index) => {
        brands[index] = brandAdapter(brand);
      });

      products.map((product, index) => {
        products[index] = productAdapter(product);
      });

      platformsData.map((platform, index) => {
        platformsData[index] = methodAdapter(platform);
      });

      dispatch(setProductState(products));
      brands = brands.filter((item) => item.status == 1);
      setMethods(platformsData);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProductStock = (id) => {
    const findStock = products.find((Product) => Product.id === id);
    if (findStock) {
      return findStock.stock;
    }
  };

  const handleDecrease = (item) => {
    let product;

    let findBrand = products.find((Brand) => Brand.id === item.id);

    if (findBrand) {
      let index = products.indexOf(findBrand);
      product = products[index];

      let newStock = parseInt(product.stock) + 1;
      let newQuantity = item.quantity - 1;

      product = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        stock: newStock,
        sellPrice: product.sellPrice,
        status: product.status,
      };

      let sellProduct = {
        id: item.id,
        name: item.name,
        brand: item.brand,
        quantity: newQuantity,
        sellPrice: item.sellPrice,
      };
      dispatch(updateSellItem(sellProduct));
      if (sellProduct.quantity == 0) {
        dispatch(deleteSellItem(item.id));
      }
      dispatch(updateProduct(product));

      //setTableValue(quantity.current.value);
    }
  };

  const handleChange = (event) => {
    setBrandValue(event.target.value);
    setProductStock(searchProductStock(event.target.value));
    setValue("");
  };

  const handleChangePlatform = (event) => {
    setPlatformValue(event.target.value);
  };

  const handleAdd = () => {
    let product;
    let metadata;

    if (quantity.current.value == "") {
      enqueueSnackbar("La cantidad no puede ser menor a 1", {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    let findBrand = products.find((Brand) => Brand.id === brandValue);

    if (findBrand) {
      let index = products.indexOf(findBrand);
      product = products[index];
      metadata = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        quantity: quantity.current.value,
        sellPrice: product.sellPrice,
      };

      let newStock = product.stock - quantity.current.value;

      product = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        stock: newStock,
        unitPrice: product.unitPrice,
        sellPrice: product.sellPrice,
        status: product.status,
      };
      setProductStock(newStock);
      dispatch(updateProduct(product));
      dispatch(setSellItem(metadata));
      setValue("");
      //setTableValue(quantity.current.value);
    }
  };

  const numberValidation = (text) => {
    if (!isNaN(text)) {
      return text;
    } else {
      enqueueSnackbar("Solo se permiten valores numéricos", {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const totalSellValidation = (money) => {
    let total = totalAccount + totalAccount * 0.16;
    if (money < total) {
      enqueueSnackbar(
        "La cantidad a pagar no puede ser menor que el total de venta",
        {
          anchorOrigin: { vertical: "top", horizontal: "center" },
          variant: "error",
          autoHideDuration: 3000,
        }
      );
    } else {
      return money;
    }
  };

  const handlePaysWith = () => {
    let total = totalAccount + totalAccount * 0.16;
    let money = paysWith.current.value;
    if (numberValidation(money)) {
      setPaysValue(money);
      setChangeValue(money - total);
    } else {
      setPaysValue("");
    }
  };

  const handleChangeQuantity = () => {
    try {
      let maxquantity = quantity.current.value;
      let stock = pStock;

      if (numberValidation(maxquantity)) {
        // console.log(datavalidation);
        if (maxquantity > stock) {
          maxquantity = stock;
          enqueueSnackbar(
            "La cantidad a vender no puede ser mayor que el stock",
            {
              anchorOrigin: { vertical: "top", horizontal: "center" },
              variant: "error",
              autoHideDuration: 2000,
            }
          );
        }

        setValue(maxquantity);
      }
    } catch (error) {}
  };

  const handleSubmit = async (total) => {
    let sellData;
    let totalitems = [...sellItems];

    if (totalSellValidation(paysValue)) {
      totalitems.map((tempItem, index) => {
        totalitems[index] = {
          idProduct: tempItem.id,
          quantity: parseInt(tempItem.quantity),
          sellPrice: tempItem.sellPrice,
        };
      });
      sellData = {
        data: JSON.stringify(totalitems),
        idMethod: platform_id.current.value,
        total,
        pays: parseInt(paysValue),
        change: paysValue - total,
      };

      try {
        const data = await callEndpoint(insert_sell(sellData));
        enqueueSnackbar("Producto agregado exitosamente.", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
          autoHideDuration: 2000,
        });
        handleSells();

        dispatch(setNullSell());
      } catch (error) {
        enqueueSnackbar(error, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const totalAccount = sellItems.reduce((accumulator, object) => {
    return accumulator + object.sellPrice * object.quantity;
  }, 0);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <>
      <Box>
        <Typography variant="h3" component="h1" className="text-center my-5 ">
          Ventas
        </Typography>
      </Box>
      <div className="w-full flex flex-col md:flex-row justify-center items-start gap-20 mt-20 px-5 md:px-10 ">
        <Box className="w-full md:w-[70vw] space-y-5 pb-5 md:pb-10">
          <Box className="flex flex-col md:flex-row gap-10">
            <FormControl className=" w-full md:w-[350px]">
              <InputLabel id="producto">Producto</InputLabel>
              <Select
                id="producto"
                value={brandValue}
                label="producto"
                onChange={handleChange}
                inputRef={item}
              >
                {products &&
                  products.map((product) => {
                    if (product.status == 1 && product.stock != 0) {
                      return (
                        <MenuItem
                          value={product.id ? product.id : ""}
                          key={product.id}
                        >
                          {product.name} | {product.brand.name} | stock:
                          {product.stock}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="Cantidad"
              variant="standard"
              value={value}
              onInput={() => handleChangeQuantity()}
              inputRef={quantity}
            />
            <Button variant="contained" onClick={handleAdd}>
              {" "}
              Agregar a ticket
            </Button>
          </Box>
          {sellItems.length == 0 ? (
            // <Loading />
            <Typography
              className=" text-gray-500 text-center py-10 "
              variant="h6"
            >
              Agrega un producto a la venta
            </Typography>
          ) : (
            <TableContainer component={Paper} elevation={3}>
              <Table
                sx={{ minWidth: 250 }}
                aria-label="simple table"
                className=""
              >
                <TableHead className="">
                  <TableRow className="">
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="right"
                    >
                      ID
                    </TableCell>
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="center"
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="center"
                    >
                      Marca
                    </TableCell>
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="center"
                    >
                      Precio
                    </TableCell>
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="center"
                    >
                      Cantidad
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody className="">
                  {sellItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="right">
                        {item.id}
                      </TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.brand.name}</TableCell>

                      <TableCell align="center">${item.sellPrice}</TableCell>
                      <TableCell
                        align="center"
                        className="flex items-center justify-center"
                      >
                        <p>{item.quantity}</p>
                        <IconButton
                          aria-label="remove 1 "
                          className="text-yellow-500"
                          onClick={() => handleDecrease(item)}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                        {/* <TextField
                          id="outlined-number"
                          type="text"
                          placeholder="0"
                          value={value}
                          onInput={() => handleChangeQuantity()}
                          inputRef={quantity}
                          variant="standard"
                          className="w-[50px] "
                        /> */}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          className="text-red-500"
                          onClick={() => deleteitem(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Box className="flex flex-col w-full md:w-auto space-y-10 ">
          <Paper
            className="rounded-2xl w-full md:w-[500px] overflow-hidden "
            elevation={3}
          >
            <Typography className="bg-amber-500 text-white px-5 py-4 ">
              Detalle
            </Typography>
            <Box className="px-5 space-y-4 pb-4">
              <Typography className="font-medium mt-4">
                Subtotal : ${totalAccount}
              </Typography>
              <Typography className="font-medium">
                IVA(16%) : ${totalAccount * 0.16}
              </Typography>
              <Divider variant="middle" />
              <Typography className="font-medium text-2xl mb-2 ">
                Total :{" "}
                <span className="text-emerald-500">
                  ${totalAccount + totalAccount * 0.16}{" "}
                </span>
              </Typography>
              <Box className="flex flex-col md:flex-row gap-3 items-center">
                <FormControl className="w-full">
                  <TextField
                    id="standard-basic"
                    label="Paga con"
                    variant="outlined"
                    value={paysValue}
                    onInput={() => handlePaysWith()}
                    inputRef={paysWith}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <TextField
                    disabled
                    id="standard-basic"
                    label="Cambio"
                    className="bg-gray-200"
                    value={changeValue}
                  />
                </FormControl>
              </Box>
              <FormControl className="w-full">
                <InputLabel id="plataforma">Plataforma</InputLabel>
                <Select
                  id="plataforma"
                  value={platformValue}
                  label="plataforma"
                  onChange={handleChangePlatform}
                  inputRef={platform_id}
                >
                  {methods &&
                    methods.map((method) => {
                      if (method.status == 1) {
                        return (
                          <MenuItem
                            value={method.id ? method.id : ""}
                            key={method.id}
                          >
                            {method.name}
                          </MenuItem>
                        );
                      }
                    })}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                className="w-full"
                onClick={() => handleSubmit(totalAccount + totalAccount * 0.16)}
              >
                Cerrar venta
              </Button>
            </Box>
          </Paper>

          <Grid
            item
            xs={12}
            className="px-5 rounded-2xl "
            component={Paper}
            elevation={3}
          >
            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
              Últimas ventas
            </Typography>
            <Demo>
              <List dense={dense}>
                {accounts &&
                  accounts.map((account) => (
                    <div key={account.idSell}>
                      <Divider />
                      <ListItem className=" flex">
                        <ListItemIcon>
                          <MonetizationOnIcon className="text-emerald-500" />
                        </ListItemIcon>

                        <ListItemText
                          primary={account.name}
                          secondary={account.dateCreated}
                        />
                        <ListItemText primary={"$" + account.total} />
                        <IconButton aria-label="delete">
                          <VisibilityIcon />
                        </IconButton>
                      </ListItem>
                    </div>
                  ))}
              </List>
            </Demo>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Sells;
