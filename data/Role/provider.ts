import { Provider } from "@/utils/fesjs/mongo";
import Role from "./model";

class RoleProvider extends Provider {}

export default new RoleProvider(Role);
