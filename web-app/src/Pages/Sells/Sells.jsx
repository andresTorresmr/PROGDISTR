import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchAndLoad } from "../../hooks";
import {
  get_brands,
  get_methods,
  get_products,
  get_sells,
  insert_sell,
} from "../../services";
import { brandAdapter, methodAdapter, productAdapter } from "../../adapters";
import { setProductState } from "../../redux/states/product.state";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styled from "@emotion/styled";
import { setNullSell, setSellItem } from "../../redux/states/sell.state";
import { setAccountState } from "../../redux/states/account.state";
import { useSnackbar } from "notistack";

const Sells = () => {
  const products = useSelector((state) => state.products);
  const sellItems = useSelector((state) => state.sells);
  const [methods, setMethods] = useState([]);
  const { loading, callEndpoint } = useFetchAndLoad();
  const [value, setValue] = React.useState(null);
  const item = useRef();
  const platform_id = useRef();
  const quantity = useRef();
  const dispatch = useDispatch();
  const [brandValue, setBrandValue] = React.useState("");
  const [platformValue, setPlatformValue] = React.useState("");
  const accounts = useSelector((state) => state.accounts);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleCharge();
    handleSells();
  }, []);

  const handleSells = async () => {
    const sells = await callEndpoint(get_sells());
    dispatch(setAccountState(sells.data));
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

  const handleChange = (event) => {
    setBrandValue(event.target.value);
  };
  const handleChangePlatform = (event) => {
    setPlatformValue(event.target.value);
  };

  const handleAdd = () => {
    let product;
    let metadata;

    let findBrand = products.find((Brand) => Brand.id === brandValue);

    if (findBrand) {
      let index = products.indexOf(findBrand);
      product = products[index];
      metadata = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        quantity: quantity.current.value,
        unitPrice: product.unitPrice,
      };
      dispatch(setSellItem(metadata));
    }

    const handleUpdate = () => {};
  };

  const handleSubmit = async (total) => {
    let sellData;
    let totalitems = [...sellItems];
    totalitems.map((tempItem, index) => {
      totalitems[index] = {
        idProduct: tempItem.id,
        quantity: parseInt(tempItem.quantity),
        unitPrice: tempItem.unitPrice,
      };
    });
    sellData = {
      data: JSON.stringify(totalitems),
      idMethod: platform_id.current.value,
      total,
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
  };

  const totalAccount = sellItems.reduce((accumulator, object) => {
    return accumulator + object.unitPrice * object.quantity;
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
      <div className="w-full h-[94vh] flex justify-center items-start gap-20 mt-20 px-10 ">
        <Box className=" w-[70vw] space-y-5 pb-10">
          <Box className="flex gap-10">
            <FormControl className="w-[350px]">
              <InputLabel id="producto">Producto</InputLabel>
              <Select
                id="producto"
                value={brandValue}
                label="producto"
                onChange={handleChange}
                inputRef={item}
              >
                {products &&
                  products.map((product) => (
                    <MenuItem
                      value={product.id ? product.id : ""}
                      key={product.id}
                    >
                      {product.name} | {product.brand.name} | sotck:{" "}
                      {product.stock}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Cantidad"
              variant="standard"
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
                className="text-red-500"
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
                      Precio unitario
                    </TableCell>
                    <TableCell
                      className="text-slate-700 font-semibold text-md"
                      align="center"
                    >
                      Cantidad
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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

                      <TableCell align="center">${item.unitPrice}</TableCell>
                      <TableCell align="center">
                        <TextField
                          id="outlined-number"
                          type="text"
                          placeholder="0"
                          value={item.quantity}
                          variant="standard"
                          className="w-[50px] "
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Box className="flex flex-col space-y-10">
          <Paper
            className="rounded-2xl w-[500px] overflow-hidden "
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
                    <>
                      <Divider />
                      <ListItem className=" flex" key={account.idSell}>
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
                    </>
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
