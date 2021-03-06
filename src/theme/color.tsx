// import config setting
import config from "../config";

// Color Themes
const themes = {
  Misao: {
    //Logo color: 
    Logo: "#006623",
    // primary color
    primaryLightColor: "#85FF91",//xanh lá nhạt
    primaryColor: "#006623",// xanh lá đậm
    primaryColorDark: "#00945a", // xanh lá đậm
    primaryColorLight: "#B5E9BA",//xanh lá nhạt
    onPrimaryColor: "#ffffff",// trắng
    customOnPrimaryColor: '#bc0021',// đỏ

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
    secondaryText: "#B5E9BA",//xanh lá nhạt
    disabledText: "rgba(0, 0, 0, 0.38)",//xám nhạt
    normalText: "#424242", // xám chì
    linkText: "#007537",// xanh đậm
    linkButton: "#4C9EEB",// xanh biển

    // button color
    disabledButton: "#bfbfbf",
    normalButton: "#000000",
    themeButton: "#006623",
    // background, surface
    background: "#ffffff",
    underBackground: "#F4F4F4", //màu xám nhẹ
    onBackground: "#212121", // màu than chì
    themeBackground: "#B5E9BA",// màu xanh trang chủ
    onSurface: "#757575", //xám than
    error: "#cd040b",
    onError: "#fff",
    black: "#010203",
    white: "#fff",
    lightBlack: "#696969",
    // border color
    borderColor: "#d1d1d1",
    important: '#D40000',//red
    pink: '#f66',
    pinkBackground: "#FFD5D5",
    pinkBackgroundLight: "#FFE3E3",

  }
};

const theme = themes[config.theme];
export default theme;
