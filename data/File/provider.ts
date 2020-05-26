import { Provider } from "@/lib/core/mongo";
import File from "./model";

class FileProvider extends Provider {}

export default new FileProvider(File);
