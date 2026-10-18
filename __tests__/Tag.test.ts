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
