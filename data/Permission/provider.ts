import { Provider } from "@/lib/core/mongo";
import Permission from "./model";

class PermissionProvider extends Provider {}

export default new PermissionProvider(Permission);
