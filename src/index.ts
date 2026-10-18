import FormBuilder, { type Template } from "./FormBuilder.js";
import Tag from "./Tag.js";

export type { InputOptions, Template } from "./FormBuilder.js";

export interface FormOptions {
  url?: string;
  method?: string;
}

export type FormCallback = (form: FormBuilder) => void;

export default class HexletCode {
  static formFor(template: Template, options: FormOptions, callback: FormCallback): string {
    const { url = "#", method = "post" } = options;
    const form = new FormBuilder(template);

    callback(form);

    return new Tag("form", { action: url, method }, form.toString()).toString();
  }
}
