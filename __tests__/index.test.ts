import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import HexletCode from "../src/index.js";

const getFixture = (name: string): string =>
  readFileSync(new URL(`../__fixtures__/${name}`, import.meta.url), "utf-8").trim();

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

test("generates input and textarea", () => {
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
  });
  expect(form).toBe(getFixture("form-with-fields.html"));
});

test("adds extra attributes to fields", () => {
  const form = HexletCode.formFor(template, {}, (f) => {
    f.input("name", { class: "user-input" });
    f.input("job");
  });
  expect(form).toBe(getFixture("form-with-attributes.html"));
});

test("uses default textarea size", () => {
  const form = HexletCode.formFor(template, {}, (f) => f.input("job", { as: "textarea" }));
  expect(form).toBe(getFixture("form-with-textarea.html"));
});

test("overrides default textarea size", () => {
  const form = HexletCode.formFor(template, { url: "#" }, (f) =>
    f.input("job", { as: "textarea", rows: 50, cols: 50 }),
  );
  expect(form).toBe(getFixture("form-with-custom-textarea.html"));
});

test("adds submit button with default text", () => {
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
    f.submit();
  });
  expect(form).toBe(getFixture("form-with-submit.html"));
});

test("adds submit button with custom text", () => {
  const form = HexletCode.formFor(template, { method: "post" }, (f) => {
    f.input("name");
    f.input("job", { as: "textarea" });
    f.submit("Wow");
  });
  expect(form).toBe(getFixture("form-with-custom-submit.html"));
});

test("throws when field does not exist in template", () => {
  expect(() =>
    HexletCode.formFor(template, { url: "/users" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.input("age");
    }),
  ).toThrow("Field 'age' does not exist in the template.");
});

test("renders empty value for null field", () => {
  const form = HexletCode.formFor({ name: null }, {}, (f) => f.input("name"));
  expect(form).toBe(
    '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value=""></form>',
  );
});
