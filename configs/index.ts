import 'dotenv/config'

import dev from './config.dev'
import prod from './config.prod'

const env: any = process.env.NODE_ENV === 'production' ? prod : dev

export default env
