import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_sells = () => {
  const controller = loadAbort();

  return {
    call: server.get("Sell", {
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
