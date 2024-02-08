import App from "./App";
import { render } from "@testing-library/react-native";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = render(<App />).toJSON();

    expect(tree.children.length).toBe(1);
  });
});
