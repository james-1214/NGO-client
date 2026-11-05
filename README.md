
# NGO static website

## Run locally

```bash
npm install
npm run dev
```

## Build for Hostinger

```bash
npm run build
```

Upload the contents of `dist/` to your Hostinger `public_html` directory.

## Recent stability and Earth-globe updates

- Removed the unsupported React `fetchPriority` prop from the shared Photo component.
- Enabled React Router v7 future flags on the existing BrowserRouter.
- Added relative positioning to the root and hero scroll target for Framer Motion scroll measurements.
- Replaced the abstract wireframe sphere with a textured Earth sphere using a bundled SVG world-map texture.
- Reduced globe particle count and pixel ratio to reduce GPU load.
- Replaced the second WebGL canvas in the story section with a lightweight CSS Earth illustration.
- Added a CSS fallback if the browser loses its WebGL context.

The bundled Earth texture is a stylized world map, not a satellite photograph. Replace it with a licensed satellite texture if a photorealistic globe is required.
=======
# NGO-client

