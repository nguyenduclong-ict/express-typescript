import { Provider } from "@/lib/core/mongo";
import Role from "./model";

class RoleProvider extends Provider {}

export default new RoleProvider(Role);
