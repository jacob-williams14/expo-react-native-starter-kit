# Assets

Static assets for the application.

## Structure

- `fonts/` - Custom font files (.ttf, .otf)
- `images/` - Images, icons, splash screens

## Usage

### Images

```tsx
import { Image } from "react-native";

<Image source={require("~/assets/images/logo.png")} />;
```

### Fonts

Load fonts in your root layout:

```tsx
import { useFonts } from "expo-font";

const [fontsLoaded] = useFonts({
  CustomFont: require("~/assets/fonts/CustomFont.ttf"),
});
```

## Icon Libraries

This starter kit uses `@expo/vector-icons` which includes:

- Ionicons
- Material Icons
- Font Awesome
- And many more

No need to add icon files manually.
