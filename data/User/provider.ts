import { Provider } from '@/lib/core/mongo'
import User from './model'
import RoleProvider from '@/data/Role/provider'

class UserProvider extends Provider {
    async createShopAdmin(data) {
        // grant role shop-admin
        const role = await RoleProvider.getOne({ id: 'shop-admin' })
        data.roles = [role._id]
        // create default shop
        return User.create(data)
    }

    getAllUser() {
        return User.find().lean().exec()
    }
}

export default new UserProvider(User)
