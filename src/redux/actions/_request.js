/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (method, url, data = null) => {
  const { data: res } = await axios[method](url, data);
  return res;
};
