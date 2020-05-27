import check from '../lib/core/validator/check'

const schema = {
    name: check.string,
    info: {
        age: check.equal(10),
        type: check.inList('customer', '10'),
    },
}

console.log(
    check.check(schema, {
        name: 10,
        info: {
            age: 10,
            type: 'customer',
        },
    })
)
