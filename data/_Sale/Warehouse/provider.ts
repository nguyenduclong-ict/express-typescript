import { Provider } from "@/lib/fesjs/mongo";
import Warehouse from "./model";

class WarehouseProvider extends Provider {}

export default new WarehouseProvider(Warehouse);
