import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useFetchAndLoad } from "../../hooks";
import { login_service } from "../../services/login.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginData = {
      user: e.target.user.value,
      password: e.target.password.value,
    };
    try {
      const { data } = await callEndpoint(login_service(loginData));

      localStorage.setItem("access_token", data.access_token);

      setTimeout(() => {
        enqueueSnackbar("Sesión iniciada exitosamente.", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/productos", { replace: true });
      }, 2000);
    } catch (error) {
      enqueueSnackbar("Usuario o contraseña incorrecto", {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  // const { data } = callEndpoint(login_service(data));
  // console.log(data);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="h-screen w-full bg-slate-700 flex items-center justify-center">
      <Box
        className="bg-white rounded-xl px-10 py-10 flex flex-col gap-10 items-center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" className="">
          Iniciar Sesión
        </Typography>
        <Box className="flex flex-col gap-5 md:justify-center w-3/4">
          <FormControl variant="outlined">
            <InputLabel htmlFor="user">Usuario</InputLabel>
            <OutlinedInput
              id="user"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="user" edge="end">
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Button variant="contained" type="submit" className="w-full py-5">
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
