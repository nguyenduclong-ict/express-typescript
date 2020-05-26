import { Provider } from "@/lib/core/mongo";
import Config from "./model";

class ConfigProvider extends Provider {}

export default new ConfigProvider(Config);
