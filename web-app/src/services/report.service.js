import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_month_report = (month) => {
  const controller = loadAbort();

  return {
    call: server.get(`Report/monthly/${month}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const get_product_monthly_report = (month) => {
  const controller = loadAbort();

  return {
    call: server.get(`Report/products/month/${month}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
