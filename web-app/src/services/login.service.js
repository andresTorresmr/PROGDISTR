import { server } from "../config";
import { loadAbort } from "../utilities";

export const login_service = (data) => {
  const controller = loadAbort();

  return {
    call: server.post("Auth/login", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const validation_service = () => {
  const controller = loadAbort();

  return {
    call: server.get("Validation/", {
      signal: controller.signal,
    }),
    controller,
  };
};
