import { Provider } from "@/utils/fesjs/mongo";
import File from "./model";

class FileProvider extends Provider {}

export default new FileProvider(File);
