import axios from "axios";
import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_brands = () => {
  const controller = loadAbort();

  return {
    call: server.get("Brand", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insert_brand = (data) => {
  const controller = loadAbort();

  return {
    call: server.post("Brand/insert", data, {
      signal: controller.signal,
    }),
    controller,
  };
};
