import React from "react";
import ToastTemplate, { getColorByType } from "./index";
import { renderWithProvider } from "@test/render";

describe("<ToastTemplate />", () => {
  it("renders a toast message with the given text", () => {
    const message = "This is a test message";
    const { getByText } = renderWithProvider(
      <ToastTemplate type="success" message={message} />,
    );
    expect(getByText(message)).toBeDefined();
  });

  it("applies the correct background color based on the 'type' prop", () => {
    expect(getColorByType("success")).toBe("emerald.500");
    expect(getColorByType("error")).toBe("red.500");
    expect(getColorByType("info")).toBe("blue.500");
    // @ts-expect-error - Testing the default case
    expect(getColorByType("")).toBe("");
  });
});
