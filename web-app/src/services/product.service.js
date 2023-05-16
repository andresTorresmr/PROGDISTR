import axios from "axios";
import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_products = () => {
  const controller = loadAbort();

  return {
    call: server.get("Product/", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insert_product = (data) => {
  const controller = loadAbort();

  return {
    call: server.post("Product/insert", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const update_product = (data, id) => {
  const controller = loadAbort();

  return {
    call: server.put(`Product/update/${id}`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const delete_product = (id) => {
  const controller = loadAbort();

  return {
    call: server.delete(`Product/delete/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
