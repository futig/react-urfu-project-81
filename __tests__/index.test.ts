import { expect, test } from "vitest";
import HexletCode from "../src/index";

test("exports class by default", () => {
  expect(HexletCode).toBeTypeOf("function");
});
