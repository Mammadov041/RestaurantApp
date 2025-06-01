import axios from "axios";

const BASE_URL = "https://localhost:7091/api/";

export const END_POINTS = {
  CUSTOMER: "Customer",
  FOODITEM: "FoodItem",
  ORDER: "Order",
};

export const createApiEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: async () => {
      return await axios.get(url);
    },
    fetchById: async (id) => {
      return await axios.get(`${url}${id}`);
    },
    create: async (newRecord) => {
      return await axios.post(url, newRecord);
    },
    update: async (id, updatedRecord) => {
      return await axios.put(`${url}${id}`, updatedRecord);
    },
    delete: async (id) => {
      return await axios.delete(`${url}${id}`);
    },
  };
};
