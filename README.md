# pyno
Auto-preload `__init__.js` and execute NodeJS script

## Install

```
npm install -g dangh/pyno
```

## Usage

```
pyno ./some/file.js
```

## SublimeText build system

```json
{
	"shell_cmd": "(type pyno &>/dev/null) || pnpm i -g dangh/pyno && pyno \"$file\"",
	"selector": "source.js",
	"env": {
		"FORCE_COLOR": "0"
	},
	"quiet": true,
}
```
