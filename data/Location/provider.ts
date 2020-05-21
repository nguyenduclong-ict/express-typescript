import { Provider } from "@/lib/fesjs/mongo";
import Location from "./model";

class LocationProvider extends Provider {}

export default new LocationProvider(Location);
