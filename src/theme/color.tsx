// import config setting
import config from "../config";

// Color Themes
const themes = {
  Misao: {
    //Logo color: 
    Logo: "#006623",
    // primary color
    primaryLightColor: "#",
    primaryColor: "#006623",//00b970//bc0021
    primaryColorDark: "#00945a",
    primaryColorLight: "#B5E9BA",
    onPrimaryColor: "#ffffff",//
    customOnPrimaryColor: '#bc0021',

    //dark background
    //darkBackgroundColor:'#bc0021',
    //darkScreenPrimaryText:'#ffffff',
    //darkScreensecondaryText:'#ffffff',

    // accent color, triad
    accentColor: "#0069b9",
    onAccentColor: "#fff",

    // secondary color, primary color split
    secondaryColor: "#B5E9BA",
    onSecondaryColor: "#fff",

    // tertiary color, secondary color intermediately related
    tertiaryColor: "#ffa400",
    onTertiaryColor: "#fff",

    // status bar color
    statusBarColor: "#bc0021",//#fff

    // gradient colors
    primaryGradientColor: "#bc0021",
    secondaryGradientColor: "#bc0021",

    // overlay color
    overlayColor: "#b90039",

    // text color
    primaryText: "#010203",//đen xanh
    secondaryText: "#B5E9BA",
    disabledText: "rgba(0, 0, 0, 0.38)",
    normalText: "#424242",
    linkText: "#007537",

    // background, surface
    background: "#ffffff",
    underBackground: "#F4F4F4",
    onBackground: "#212121", // màu than chì
    themeBackground: "#B5E9BA",// màu xanh trang chủ
    surface: "#fff",
    onSurface: "#757575", //xám than
    error: "#cd040b",
    onError: "#fff",
    black: "#010203",
    white: "#fff",
    lightBlack: "#696969",
    // border color
    borderColor: "#d1d1d1",
    important: '#D40000',

  }
};

const theme = themes[config.theme];
export default theme;
