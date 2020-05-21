import { Provider } from "@/lib/fesjs/mongo";
import File from "./model";

class FileProvider extends Provider {}

export default new FileProvider(File);
