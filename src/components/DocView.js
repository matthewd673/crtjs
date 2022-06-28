import './DocView.css';

import React from 'react';
import ReactMarkdown from 'react-markdown';

const DocView = () => {

  const docText = `# API Docs
## Entry-points
*NOTE: The code must end by returning an object containing both \`init\` and \`loop\`*
### init()
Called once, before anything else, as soon as the run button is pressed.

### loop()
Called every frame (or 'tick').
The number of ticks since the beginning of execution is stored in \`tick\`.

## Rendering
### fill(color)
Fill the entire canvas with a given \`Color\`.
### set(x, y, color)
Set a pixel to a given \`Color\`.
### Color
An enum of the 16 colors available for rendering.
### canvas
An object containing useful information about the canvas.
- \`context\`
  - The 2d context used by other rendering functions.
- \`width\`
- \`height\`
- \`scale\`
  - The rendering scale.
- \`center\`
  - \`x\`
  - \`y\`
- \`colorTable\`
  - Contains the hex values of all Colors.
`

  return (
    <div className='doc-container'>
      <ReactMarkdown
        children={docText}
      />
    </div>
  );
}

export default DocView;