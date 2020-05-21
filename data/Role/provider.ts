import { Provider } from "@/lib/fesjs/mongo";
import Role from "./model";

class RoleProvider extends Provider {}

export default new RoleProvider(Role);
