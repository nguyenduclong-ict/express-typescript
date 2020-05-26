import { Provider } from "@/lib/core/mongo";
import Warehouse from "./model";

class WarehouseProvider extends Provider {}

export default new WarehouseProvider(Warehouse);
