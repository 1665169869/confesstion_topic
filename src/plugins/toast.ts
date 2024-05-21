import { POSITION, type PluginOptions } from "vue-toastification";
// 不加载css就出bug
import "vue-toastification/src/scss/index.scss";
import "@/assets/toast.css";

const toastPluginOptions: PluginOptions = {
	position: POSITION.TOP_CENTER,
	toastClassName: "toast-mobile"
};

export default toastPluginOptions;
