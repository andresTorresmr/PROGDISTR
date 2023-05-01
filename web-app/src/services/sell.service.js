import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_sells = () => {
  const controller = loadAbort();

  return {
    call: server.get("Sell/widget", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insert_sell = (data) => {
  const controller = loadAbort();

  return {
    call: server.post("Sell/insert", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const get_all_sells = () => {
  const controller = loadAbort();

  return {
    call: server.get("sell", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const get_sell_details = (id) => {
  const controller = loadAbort();

  return {
    call: server.get(`sell/details/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
