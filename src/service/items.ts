import { Item } from "@src/@types/item";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

class Services {
  getItems = async (): Promise<Item[]> => {
    const response = await axios.get(`${API_BASE_URL}/items`);

    return response.data.filter((item: Item) => item.quantity > 0);
  };

  removeItem = async (item: Item) => {
    const response = await axios.put(`${API_BASE_URL}/items/${item.id}`, {
      ...item,
      quantity: item.quantity - 1,
    });

    return response.data;
  };

  checkoutItems = async (items: Item[]) => {
    try {
      for (const item of items) {
        await this.removeItem(item);
      }

      return true;
    } catch (error) {
      return false;
    }
  };
}
const services = new Services();
export default services;
