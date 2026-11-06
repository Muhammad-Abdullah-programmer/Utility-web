import { WordCounter, CaseConverter, JsonTool, EncodeTool, Lorem } from "./text";
import { UnitConverter, Percentage, Bmi, Age, Tip, ColorConverter } from "./calc";

export const sections = [
  {
    path: "/text",
    title: "Text & Dev",
    desc: "Clean up text and handle common developer chores.",
    tools: [
      { id: "count", icon: "🔤", label: "Word Counter", desc: "Words, characters, sentences and reading time.", Component: WordCounter },
      { id: "case", icon: "Aa", label: "Case Converter", desc: "UPPER, Title, camelCase, snake_case and more.", Component: CaseConverter },
      { id: "json", icon: "{}", label: "JSON Formatter", desc: "Validate, prettify or minify JSON.", Component: JsonTool },
      { id: "encode", icon: "🔐", label: "Base64 / URL", desc: "Encode and decode Base64 or URL strings.", Component: EncodeTool },
      { id: "lorem", icon: "📝", label: "Lorem Ipsum", desc: "Placeholder paragraphs for your designs.", Component: Lorem },
    ],
  },
  {
    path: "/calc",
    title: "Calculators",
    desc: "Convert units and solve everyday maths.",
    tools: [
      { id: "units", icon: "📏", label: "Unit Converter", desc: "Length, weight, temperature and data size.", Component: UnitConverter },
      { id: "percent", icon: "％", label: "Percentage", desc: "Percent of, percent of total and percent change.", Component: Percentage },
      { id: "bmi", icon: "⚖️", label: "BMI", desc: "Body mass index from height and weight.", Component: Bmi },
      { id: "age", icon: "🎂", label: "Age", desc: "Exact age and days to next birthday.", Component: Age },
      { id: "tip", icon: "🧾", label: "Tip Splitter", desc: "Tip and split a bill between people.", Component: Tip },
      { id: "color", icon: "🎨", label: "Color Converter", desc: "HEX, RGB and HSL with a colour picker.", Component: ColorConverter },
    ],
  },
];
