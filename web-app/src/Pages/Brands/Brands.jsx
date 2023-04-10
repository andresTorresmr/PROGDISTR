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
import { get_brands } from "../../services";
import Loading from "../Loading/Loading";
import { brandAdapter } from "../../adapters";
import { Button, IconButton, Typography } from "@mui/material";
import AddBrandModal from "./Modals/AddBrandModal";
import { useDispatch, useSelector } from "react-redux";
import { setBrandState } from "../../redux/states/brand.state";
import UpdateBrandModal from "./Modals/UpdateBrandModal";
import DeleteBrandModal from "./Modals/DeleteBrandModal";

const Brands = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [brand, setbrand] = useState({});
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [brand_status, setBrand_status] = React.useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const brands_item = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    handleCharge();
    //console.log(brands_item);
  }, []);

  const handleCharge = async () => {
    let brands;
    try {
      const { data } = await callEndpoint(get_brands());
      brands = data;

      brands.map((brand, index) => {
        brands[index] = brandAdapter(brand);
      });
      dispatch(setBrandState(brands));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, name, status) => {
    let data;
    data = {
      id,
      name,
      status,
    };
    setbrand(data);
    setBrand_status(status);
    console.log(status);
    setOpenUpdate(true);
  };

  const handleDelete = async (id) => {
    setId(id);
    setOpenDelete(true);
  };

  return (
    <>
      <AddBrandModal open={open} setOpen={setOpen} />
      <UpdateBrandModal
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        brand={brand}
        brand_status={brand_status}
        setBrand_status={setBrand_status}
      />
      <DeleteBrandModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        id={id}
      />
      <Typography variant="h3" component="h1" className="text-center my-5 ">
        Marcas
      </Typography>
      <Button
        variant="contained"
        className="mt-5 mb-8 bg-slate-700 "
        endIcon={<AddCircleIcon />}
        onClick={() => setOpen(true)}
      >
        Agregar marca
      </Button>
      {loading && brands_item ? (
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
              {brands_item.map((brand) => (
                <TableRow
                  key={brand.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {brand.id}
                  </TableCell>
                  <TableCell align="center">{brand.name}</TableCell>
                  <TableCell align="center">
                    {brand.status == 1 ? (
                      <span className="stock">Activo</span>
                    ) : (
                      <span className="out-stock">Inactivo</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="update"
                      onClick={() =>
                        handleUpdate(brand.id, brand.name, brand.status)
                      }
                    >
                      <EditIcon className=" hover:text-yellow-400 text-slate-600" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(brand.id)}
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

export default Brands;
