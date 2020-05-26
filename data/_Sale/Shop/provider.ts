import { Provider } from "@/lib/core/mongo";
import { Types } from "mongoose";
import Shop from "./model";
import WarehouseProvider from "@/data/_Sale/Warehouse/provider";
class ShopProvider extends Provider {
    async createShop(data) {
        // prepare data
        data._id = new Types.ObjectId();
        const [shop, wh] = await Promise.all([
            this.createOne(data),
            // add default warehouse
            WarehouseProvider.createOne({
                shopId: data._id,
                name: "Kho mặc định",
                address: data.address,
                isDefault: true,
            }),
        ]);
        return shop;
    }
}

export default new ShopProvider(Shop);
