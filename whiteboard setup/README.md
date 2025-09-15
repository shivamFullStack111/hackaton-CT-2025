# Basic setup of white board in react js

## Create React App 

```bash 
npm create vite@latest
```

## Install Excalidraw 

``` bash 
npm i @excalidraw/excalidraw
```

## Example usage 

```jsx
import { Excalidraw } from "@excalidraw/excalidraw";

import '../node_modules/@excalidraw/excalidraw/dist/dev/index.css'

const ExcalidrawWrapper = () => {
  return (
    <div style={{width:500,height:300}}>
      <Excalidraw />
    </div>
  );
};

export default ExcalidrawWrapper;
```