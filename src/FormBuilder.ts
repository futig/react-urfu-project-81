import type { Attributes } from "./Tag.js";

export type Template = Record<string, unknown>;

export interface InputOptions {
  as?: "input" | "textarea";
  label?: string;
  labelHtml?: Attributes;
  [attribute: string]: string | number | Attributes | undefined;
}

export interface TextField {
  type: "input" | "textarea";
  name: string;
  label: string;
  labelAttributes: Attributes;
  value: string;
  attributes: Attributes;
}

export interface SubmitField {
  type: "submit";
  value: string;
}

export type Field = TextField | SubmitField;

export interface Form {
  action: string;
  method: string;
  fields: Field[];
}

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export default class FormBuilder {
  private readonly fields: Field[] = [];

  constructor(private readonly template: Template) {}

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = "input", label = capitalize(name), labelHtml = {}, ...attributes } = options;

    this.fields.push({
      type: as,
      name,
      label,
      labelAttributes: labelHtml,
      value: String(this.template[name] ?? ""),
      attributes: attributes as Attributes,
    });
  }

  submit(value = "Save"): void {
    this.fields.push({ type: "submit", value });
  }

  build(action: string, method: string): Form {
    return { action, method, fields: [...this.fields] };
  }
}
