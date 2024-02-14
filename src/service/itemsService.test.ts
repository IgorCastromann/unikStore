import axios from "axios";
import itemsService from "./items";
import { buildItemsArrayMock } from "@test/mocks/item";

jest.mock("axios");

const mockItems = buildItemsArrayMock(3);

describe("itemsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getItems", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockItems });

    const items = await itemsService.getItems();

    expect(items).toHaveLength(3);
    expect(items[0].quantity).toBeGreaterThan(0);
    expect(items[1].quantity).toBeGreaterThan(0);
    expect(items[2].quantity).toBeGreaterThan(0);
  });

  it("checkoutItems return true", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: mockItems[0] });

    const result = await itemsService.checkoutItems(mockItems);

    expect(axios.put).toHaveBeenCalledTimes(3);
    expect(result).toBe(true);
  });

  it("checkoutItems return false", async () => {
    (axios.put as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    const result = await itemsService.checkoutItems(mockItems);

    expect(result).toBe(false);
  });
});
