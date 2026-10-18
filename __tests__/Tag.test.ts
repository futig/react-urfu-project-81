import { expect, test } from "vitest";
import Tag from "../src/Tag";

test.each([
  [new Tag("br"), "<br>"],
  [new Tag("img", { src: "path/to/image" }), '<img src="path/to/image">'],
  [new Tag("input", { type: "submit", value: "Save" }), '<input type="submit" value="Save">'],
  [new Tag("label", {}, "Email"), "<label>Email</label>"],
  [new Tag("label", { for: "email" }, "Email"), '<label for="email">Email</label>'],
  [new Tag("div"), "<div></div>"],
])("%s", (tag, expected) => {
  expect(tag.toString()).toBe(expected);
});

test("keeps attributes order and converts numbers to strings", () => {
  const tag = new Tag("textarea", { cols: 20, rows: 40, name: "job" }, "hexlet");
  expect(tag.toString()).toBe('<textarea cols="20" rows="40" name="job">hexlet</textarea>');
});

test("ignores body for single tags", () => {
  expect(new Tag("br", {}, "text").toString()).toBe("<br>");
});

test("converts to string implicitly", () => {
  expect(`${new Tag("hr")}`).toBe("<hr>");
});
