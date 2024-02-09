import { Item } from "@src/@types/item";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

class Services {
  getItems = async (): Promise<Item[]> => {
    const response = await axios.get(`${API_BASE_URL}/items`);

    return response.data;
  };
}
const services = new Services();
export default services;
