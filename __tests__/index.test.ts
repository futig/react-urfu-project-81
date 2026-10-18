import { expect, test } from "vitest";
import HexletCode from "../src/index.js";

const template = { name: "rob", job: "hexlet", gender: "m" };

test("generates empty form with default attributes", () => {
  const form = HexletCode.formFor(template, {}, () => {});
  expect(form).toBe('<form action="#" method="post"></form>');
});

test("uses url as form action", () => {
  const form = HexletCode.formFor(template, { url: "/users" }, () => {});
  expect(form).toBe('<form action="/users" method="post"></form>');
});

test("uses passed method", () => {
  const form = HexletCode.formFor(template, { method: "get" }, () => {});
  expect(form).toBe('<form action="#" method="get"></form>');
});
