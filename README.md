# website-blocker

A simple website blocker (200 LoC) extension on Chrome that I use for myself

## How to use

Load the extension by

```
Chrome settings > Extensions > Manage extensions  > Load unpacked
Choose the repo folder
```

Edit the settings (Right click on the extension icon, or the three dots besides it, choose Options) with this examples:
(Edit websites and timing as you like)

```json
{
  "patterns": [
    "*://vnexpress.net/*",
    "*://*.facebook.com/*",
    "*://*.youtube.com/*",
    "*://goctruyentranhvui*"
  ],
  "schedule": {
    "mon": [
      [6, 12],
      [13, 23]
    ],
    "tue": [
      [6, 12],
      [13, 23]
    ],
    "wed": [
      [6, 12],
      [13, 23]
    ],
    "thu": [
      [6, 12],
      [13, 23]
    ],
    "fri": [
      [6, 12],
      [13, 23]
    ],
    "sat": [
      [6, 12],
      [14, 23]
    ],
    "sun": [
      [6, 12],
      [14, 23]
    ]
  }
}
```
