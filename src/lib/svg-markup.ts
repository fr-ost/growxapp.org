import { Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/** SVG attributes React spells in camelCase that keep that spelling in markup. */
const KEEP_CASE = new Set(["viewBox", "preserveAspectRatio", "gradientUnits", "gradientTransform", "patternUnits", "patternContentUnits", "stdDeviation"]);

const escape = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrName = (k: string) => (k === "className" ? "class" : KEEP_CASE.has(k) ? k : k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));

/**
 * Serialises a tree of plain SVG elements (intrinsic tags, fragments, arrays and simple function components) to a
 * markup string, so decorative artwork drawn with JSX can also be served as a static .svg file. Not a general
 * renderer: no hooks, context or event handlers.
 */
export function svgMarkup(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (Array.isArray(node)) return node.map(svgMarkup).join("");
  if (!isValidElement(node)) return "";
  const el = node as ReactElement<Record<string, unknown>>;
  const { children, ...props } = el.props as { children?: ReactNode } & Record<string, unknown>;
  if (el.type === Fragment) return svgMarkup(children);
  if (typeof el.type === "function") return svgMarkup((el.type as (p: unknown) => ReactNode)(el.props));
  if (typeof el.type !== "string") return "";
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null && v !== false && typeof v !== "function" && typeof v !== "object")
    .map(([k, v]) => ` ${attrName(k)}="${escape(String(v))}"`)
    .join("");
  const inner = svgMarkup(children);
  return inner ? `<${el.type}${attrs}>${inner}</${el.type}>` : `<${el.type}${attrs}/>`;
}
