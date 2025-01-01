import { layoutThemePrimaryColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";

const getCustomColor = ({ layoutThemePrimaryColorType }) => {
  let active;
  let bgColor;
  let hoverBgColor;
  let textColor;
  let hexCode;
  let checkedColor;

  switch (layoutThemePrimaryColorType) {
    case layoutThemePrimaryColor.TEAL_GREEN:
      active = "bg-[#066b5e]";
      bgColor = "bg-[#066b5e]/20";
      hoverBgColor = "hover:bg-[#066b5e]";
      textColor = "text-[#066b5e]";
      hexCode = "#066b5e";
      checkedColor = "checked:bg-[#066b5e]";
      break;
    case layoutThemePrimaryColor.ROYAL_PURPLE:
      active = "bg-[#5147A3]";
      bgColor = "bg-[#5147A3]/20";
      hoverBgColor = "hover:bg-[#5147A3]";
      textColor = "text-[#5147A3]";
      hexCode = "#5147A3";
      checkedColor = "checked:bg-[#5147A3]";
      break;
    case layoutThemePrimaryColor.COBALT_BLUE:
      active = "bg-[#2a5fc1]";
      bgColor = "bg-[#2a5fc1]/20";
      hoverBgColor = "hover:bg-[#2a5fc1]";
      textColor = "text-[#2a5fc1]";
      hexCode = "#2a5fc1";
      checkedColor = "checked:bg-[#2a5fc1]";
      break;
    default:
      active = "bg-[#405189]";
      bgColor = "bg-[#405189]/20";
      hoverBgColor = "hover:bg-[#405189]";
      textColor = "text-[#405189]";
      hexCode = "#405189";
      checkedColor = "checked:bg-[#405189]";
      break;
  }

  return { active, bgColor, hoverBgColor, textColor, hexCode, checkedColor };
};

export { getCustomColor };
