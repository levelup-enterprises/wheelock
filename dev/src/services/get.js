import http from "./http";
import { getJwt } from "./auth";
import { toast } from "react-toastify";

export const getAPI = async (path, values) => {
  if (values) {
    return getJwt()
      .then(() => http.get(`get/${path}.php`, { params: values }))
      .catch((e) => {
        if (e.response.data.error.message === "Token is not valid!")
          window.location.reload();
        else {
          console.log(e.response);
          toast.error("Something went wrong!");
          return { data: { error: e } };
        }
      });
  } else
    return getJwt()
      .then(() => http.get(`get/${path}.php`))
      .catch((e) => {
        if (e.response.data.error.message === "Token is not valid!")
          window.location.reload();
        else {
          console.log(e.response);
          toast.error("Something went wrong!");
          return { data: { error: e } };
        }
      });
};

export const getWorkspaces = async () => {
  try {
    const { data } = await getAPI("workspaces");
    !data.success && !data.error && !data.empty && console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const summary = async (params) => {
  try {
    const { data } = await getAPI("summary", params);
    !data.success && !data.error && !data.empty && console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (params) => {
  try {
    const { data } = await getAPI("comments", params);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExport = async (params) => {
  try {
    const { data } = await getAPI("export", params);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
