import { Provider } from "@/lib/fesjs/mongo";
import Permission from "./model";

class PermissionProvider extends Provider {}

export default new PermissionProvider(Permission);
