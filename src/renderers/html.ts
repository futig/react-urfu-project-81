import type { Field, Form } from "../FormBuilder.js";
import Tag from "../Tag.js";

const textareaDefaults = { cols: 20, rows: 40 };

const renderField = (field: Field): string => {
  if (field.type === "submit") {
    return new Tag("input", { type: "submit", value: field.value }).toString();
  }

  const { type, name, label, value, attributes } = field;
  const labelTag = new Tag("label", { for: name }, label);

  if (type === "textarea") {
    return `${labelTag}${new Tag("textarea", { ...textareaDefaults, ...attributes, name }, value)}`;
  }

  return `${labelTag}${new Tag("input", { name, type: "text", value, ...attributes })}`;
};

export default (form: Form): string => {
  const body = form.fields.map(renderField).join("");

  return new Tag("form", { action: form.action, method: form.method }, body).toString();
};
