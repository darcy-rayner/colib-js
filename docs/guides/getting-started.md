# Getting Started

> [Home](../index.md) > Guides > Getting Started

You can install colib from `npm` or `yarn`

```bash
npm install colib
yarn add colib
```

and in your scripts

```typescript
import { globalScheduler, waitForSeconds } from 'colib';

globalScheduler().add(waitForSeconds(5), () => {
  console.log('Hello World');
});
```

This approach works well if you are using a bundler with treeshaking like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/guide/en) or want type information to be available. Alternatively, if you are using ES6 modules in your browser, you can load colib from a CDN by embedding the following script call directly into your javascript.

```javascript
import { globalScheduler, waitForSeconds } from 'http://unpkg.com/colib/dist/colib.min.es.js';

globalScheduler().add(waitForSeconds(5), () => {
  console.log('Hello World');
});
```

And lastly, if you are using script tags, you can add colib globally by doing the following:

```html
<head>
  <!-- Add this line to get access to colib in your scripts -->
  <script src="http://unpkg.com/colib/dist/colib.min.js"></script>
</head>
<body>
  <script>
    colib.globalScheduler().add(colib.waitForSeconds(5), () => {
      console.log('Hello World');
    });
  </script>
</body>
```
