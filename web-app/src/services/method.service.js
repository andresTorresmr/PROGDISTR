import { server } from "../config";
import { loadAbort } from "../utilities";

export const get_methods = () => {
  const controller = loadAbort();

  return {
    call: server.get("Method", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insert_method = (data) => {
  const controller = loadAbort();

  return {
    call: server.post("Method/insert", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const update_method = (data, id) => {
  const controller = loadAbort();

  return {
    call: server.put(`Method/update/${id}`, data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const delete_method = (id) => {
  const controller = loadAbort();
  return {
    call: server.delete(`Method/delete/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
