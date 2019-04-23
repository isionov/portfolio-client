import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/paralax.js";
import "./scripts/skills.js";
import "./scripts/scroll.js";
import "./scripts/preview-slider.js";
import "./scripts/rev-slider.js";
import "./scripts/forms.js";
import "./scripts/popup.js";
