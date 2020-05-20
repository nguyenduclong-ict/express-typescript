import { Provider } from "@/utils/fesjs/mongo";
import Config from "./model";

class ConfigProvider extends Provider {}

export default new ConfigProvider(Config);
