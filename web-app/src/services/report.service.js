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
