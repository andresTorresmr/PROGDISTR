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
import { get_brands, get_methods, get_products } from "../../services";
import Loading from "../Loading/Loading";
import { brandAdapter, methodAdapter, productAdapter } from "../../adapters";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddMethodModal from "./Modals/AddMethodModal";
import { useDispatch, useSelector } from "react-redux";
import UpdateProductModal from "./Modals/UpdateMethodModal";
import DeleteMethodModal from "./Modals/DeleteMethodModal";
import SearchIcon from "@mui/icons-material/Search";
import { setProductState } from "../../redux/states/product.state";
import { setMethodState } from "../../redux/states/method.state";
import UpdateMethodModal from "./Modals/UpdateMethodModal";

const Method = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [product, setProduct] = useState({});
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = React.useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [methodValue, setMethodValue] = React.useState("");
  const method_items = useSelector((state) => state.methods);
  const [method_search, setMethodSearch] = useState(
    useSelector((state) => state.methods)
  );
  const [methodTable, setMethodTable] = useState([]);
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleCharge();
  }, []);

  const handleCharge = async () => {
    let methods;
    try {
      const { data } = await callEndpoint(get_methods());

      methods = data;

      methods.map((method, index) => {
        methods[index] = methodAdapter(method);
      });

      dispatch(setMethodState(methods));
      console.log(method_items);
      //   setMethodSearch(methods);
      //   setProductTable(methods);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (method) => {
    let data;
    data = method;
    setMethod(data);
    setStatus(data.status);
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
    var searchResult = methodTable.filter((element) => {
      if (
        element.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        element.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
    setMethodSearch(searchResult);
  };
  return (
    <>
      <AddMethodModal open={open} setOpen={setOpen} />
      <UpdateMethodModal
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        status={status}
        setStatus={setStatus}
        method={method}
      />
      <DeleteMethodModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        id={id}
      />
      <Typography variant="h3" component="h1" className="text-center my-5 ">
        Plataformas
      </Typography>
      <Box className="flex items-center justify-between mx-10">
        <Button
          variant="contained"
          className="mt-5 mb-8 bg-slate-700 "
          endIcon={<AddCircleIcon />}
          onClick={() => setOpen(true)}
        >
          Agregar plataforma
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
      {loading && method_items ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {method_items.map((method) => (
                <TableRow
                  key={method.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {method.id}
                  </TableCell>
                  <TableCell align="center">{method.name}</TableCell>
                  <TableCell align="center">
                    {method.status == 1 ? (
                      <span className="stock">Activo</span>
                    ) : (
                      <span className="out-stock">Inactivo</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="update"
                      onClick={() => handleUpdate(method)}
                    >
                      <EditIcon className=" hover:text-yellow-400 text-slate-600" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(method.id)}
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

export default Method;
