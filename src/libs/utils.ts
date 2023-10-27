import { Menu } from "@/types/component/post";

export const charByteSize = (charValue: string) => {
  if (charValue == null || charValue.length == 0) {
    return 0;
  }

  let charCode = charValue.charCodeAt(0);
  if (charCode <= 0x00007f) {
    return 1;
  } else if (charCode <= 0x0007ff) {
    return 2;
  } else if (charCode <= 0x00ffff) {
    return 3;
  } else {
    return 4;
  }
};

export const cutByteLength = (str: string, len: number) => {
  if (str == null || str.length == 0) {
    return "";
  }
  let size = 0;
  let rIndex = str.length;

  for (let i = 0; i < str.length; i++) {
    size += charByteSize(str.charAt(i));
    if (size == len) {
      rIndex = i + 1;
      break;
    } else if (size > len) {
      rIndex = i;
      break;
    }
  }

  return str.substring(0, rIndex);
};

export const getUpdateTime = (date: Date) => {
  const day = new Date(date).toISOString().split("T")[0];
  const time = new Date(date).toTimeString().split(" ")[0];
  return day + " " + time;
};

const extractMenus = (headings: Element[]): Menu[] => {
  const menus: Menu[] = [];
  let currentMenu: Menu | undefined = undefined;

  for (const heading of headings) {
    const htmlLevel = parseInt(heading.tagName.replace("H", ""), 10);

    if (htmlLevel === 1) {
      continue; // Skip h1 elements
    }

    const menuItem: Menu = { text: heading.textContent!, menus: [] };

    if (!currentMenu || htmlLevel === 2) {
      menus.push(menuItem);
      currentMenu = menuItem;
    } else if (currentMenu && htmlLevel > 2) {
      menus[menus.length - 1].menus.push(menuItem);
    }
  }
  return menus;
};

export const parseHeadings = (html: string): Menu[] => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const elements = Array.from(div.children[div.children.length - 1].children);
  const headings = elements.filter((el) => el.tagName.match(/H([1-3])/));
  const headingMenus = extractMenus(headings);
  return headingMenus;
};
