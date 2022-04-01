  // import config setting
import config from "../config";
const themes = {
    Misao: {
  // border radius
  borderRadius: 5,

  // border width
  borderWidth: 1,

    }
};

  const theme = themes[config.theme];
  export default theme;
  