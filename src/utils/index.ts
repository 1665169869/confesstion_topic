import { isEmail } from "./regex";
import storage from "../utils/storage";

export { isEmail, storage };

export const color16 = () => {
	//十六进制颜色随机
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
	return color;
};

// 获取地址栏参数
export function getUrlParam(name: string): string | null {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}
