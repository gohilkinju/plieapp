import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// font scale
export const scale = (size: number) => (width / 375) * size;

// height %
export const hp = (value: number) => (height * value) / 100;

// width %
export const wp = (value: number) => (width * value) / 100;
