import Tag, { type Attributes } from "./Tag.js";

export type Template = Record<string, unknown>;

export type InputOptions = Attributes & { as?: "input" | "textarea" };

const textareaDefaults = { cols: 20, rows: 40 };

export default class FormBuilder {
  private readonly fields: Tag[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = "input", ...attributes } = options;
    const value = String(this.template[name] ?? "");

    if (as === "textarea") {
      this.fields.push(new Tag("textarea", { ...textareaDefaults, ...attributes, name }, value));
      return;
    }

    this.fields.push(new Tag("input", { name, type: "text", value, ...attributes }));
  }

  toString(): string {
    return this.fields.join("");
  }
}
