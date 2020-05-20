import { Provider } from "@/utils/fesjs/mongo";
import Location from "./model";

class LocationProvider extends Provider {}

export default new LocationProvider(Location);
