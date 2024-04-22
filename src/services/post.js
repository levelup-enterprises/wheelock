import http from "./http";
import { getJwt } from "./auth";
import { postify } from "./utilities";
import { toast } from "react-toastify";
import session from "./session";

// General post call
export async function postAPI(path, data) {
  return getJwt()
    .then(() => http.post(`post/${path}.php`, postify(data)))
    .catch((e) => {
      console.error(e);
      return { data: { error: e } };
    });
}

export const login = async (values) => {
  try {
    const { data } = await postAPI("users/login-user", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const loginGuest = async () => {
  try {
    const { data } = await postAPI("users/login-guest");
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (values) => {
  try {
    const { data } = await postAPI("users/create", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWidgets = async (values) => {
  try {
    const { data } = await postAPI("users/widgets", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const setWorkspace = async (values) => {
  try {
    const { data } = await postAPI("env/workspace", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const verify = async (values) => {
  try {
    const { data } = await postAPI("users/verify", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (values) => {
  try {
    const { data } = await postAPI("comments/notes", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const emailNote = async (values) => {
  try {
    const { data } = await postAPI("comments/email", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//# Password calls ---------------------------------

export const resetPass = async (values) => {
  try {
    const { data } = await postAPI("users/password-request", values);
    console.log(data);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const validateToken = async (values) => {
  try {
    const { data } = await postAPI("users/password-validate", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (values) => {
  try {
    const { data } = await postAPI("users/password-update", values);
    !data.success && !data.error && console.error(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
