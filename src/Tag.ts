const singleTags = new Set(["br", "hr", "img", "input", "meta", "link"]);

export type Attributes = Record<string, string | number>;

export default class Tag {
  constructor(
    private readonly name: string,
    private readonly attributes: Attributes = {},
    private readonly body = "",
  ) {}

  private buildAttributes(): string {
    return Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join("");
  }

  toString(): string {
    const openTag = `<${this.name}${this.buildAttributes()}>`;

    if (singleTags.has(this.name)) {
      return openTag;
    }

    return `${openTag}${this.body}</${this.name}>`;
  }
}
