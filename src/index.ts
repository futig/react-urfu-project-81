import Tag from "./Tag.js";

export type Template = Record<string, unknown>;

export interface FormOptions {
  url?: string;
  method?: string;
}

// Поля формы появятся в следующих шагах, тогда колбэк получит построитель формы
export type FormCallback = (form: unknown) => void;

export default class HexletCode {
  static formFor(_template: Template, options: FormOptions, _callback: FormCallback): string {
    const { url = "#", method = "post" } = options;

    return new Tag("form", { action: url, method }).toString();
  }
}
