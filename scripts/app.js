import { Collector } from "./collector";

// This is a demo form from an external resource
const DEFINITION = DEMO;

// Start the collector with a demo form
const collector = ReactDOM.render(
  <Collector definition={DEFINITION} />,
  document.getElementById("collector")
);

// Create a new editor instance
const editor = new Tripetto.Editor({
  Element: document.getElementById("editor"),
  DisableSaveButton: true,
  DisableCloseButton: true,
  DisableOpenCloseAnimation: true,
  SupportURL: "https://gitlab.com/tripetto/examples/react-material-ui",
  
  // When the defintion is changed by the editor, reload the collector
  OnChange: definition => collector.load(definition)
});

// Open the editor with the demo form
editor.Open(DEFINITION);

// When the window resizes, we should notify the editor component
window.addEventListener("resize", () => editor.Resize());
window.addEventListener("orientationchange", () => editor.Resize());
