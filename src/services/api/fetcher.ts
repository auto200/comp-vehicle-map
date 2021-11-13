import { API_BASE_URL } from "./constants";

export const fetcher = (path: string = "") => {
  //API_BASE_URL could come from env variable
  console.log(path);
  return fetch(`${API_BASE_URL}${path}`, {
    // for some reasong it fails every time when providing additional header
    // headers: new Headers({
    //   "x-ctx-organization-id": "38c6047f-d9fd-496b-b4d6-27785499c6d7",
    // }),
  });
};
