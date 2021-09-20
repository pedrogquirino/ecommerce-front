import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "./Content";
import Product from "../../Product";

jest.mock("../../Product", () => {
  return function ProductMock() {
    return <div>Product</div>;
  };
});

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("test", () => {
  let productMock = null;
  productMock = document.createElement("div");
  act(() => {
    render(<Content />, container);
    render(<Product />, productMock);
  });
  expect(container.textContent).toContain("Product");
});
