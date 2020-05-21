import { Provider } from "@/lib/fesjs/mongo";
import Config from "./model";

class ConfigProvider extends Provider {}

export default new ConfigProvider(Config);
