import { Provider } from '@/lib/core/mongo'
import Location from './model'

class LocationProvider extends Provider {}

export default new LocationProvider(Location)
