import LocationProvider from "@/data/Location/provider";
import ConfigProvider from "@/data/Config/provider";
import citiesRaw from "@/resources/tinh_tp.json";
import districtsRaw from "@/resources/quan_huyen.json";
import Role from "@/data/Role/model";
import RoleProvider from "@/data/Role/provider";

export function initData() {
    Promise.all([
        // Admin role
        Role.exists({ id: "admin" }).then((exists) => {
            if (!exists) {
                RoleProvider.createOne({
                    id: "admin",
                    name: "Quản trị viên",
                    type: "system",
                });
            }
        }),
        // Shop admin role
        Role.exists({ id: "shop-admin" }).then((exists) => {
            if (!exists) {
                RoleProvider.createOne({
                    id: "shop-admin",
                    name: "Chủ shop",
                    type: "system",
                });
            }
        }),
        // Nhân viên
        Role.exists({ id: "staff" }).then((exists) => {
            if (!exists) {
                RoleProvider.createOne({
                    id: "staff",
                    name: "Nhân viên",
                    type: "system",
                });
            }
        }),

        // Location
        initLocation(),
    ]).then(() => {
        console.log("init data success");
    });
}

async function updateCountries() {
    const countries = [
        {
            name: "Việt Nam",
            countryCode: "84",
            slug: "VN",
            type: "country",
        },
    ];

    const result = await Promise.all(
        countries.map((c) =>
            LocationProvider.updateOne(
                { type: c.type, countryCode: c.countryCode },
                c,
                {
                    upsert: true,
                }
            )
        )
    );
    console.log("Update countries ", result);
}

async function updateCities(countryCode) {
    const cities = Object.entries(citiesRaw).map((e: any) => ({
        name: e[1].name_with_type,
        type: "city",
        provinceCode: e[1].code,
        countryCode,
        slug: e[1].slug,
    }));
    const result = await Promise.all(
        cities.map((c) =>
            LocationProvider.updateOne(
                {
                    type: c.type,
                    provinceCode: c.provinceCode,
                    countryCode: c.countryCode,
                },
                c,
                {
                    upsert: true,
                }
            )
        )
    );
    console.log("Update citis ", result);
}

async function updateDistricts(countryCode) {
    const districts = Object.entries(districtsRaw).map((e: any) => ({
        name: e[1].name_with_type,
        type: "district",
        countryCode,
        provinceCode: e[1].parent_code,
        districtCode: e[1].code,
        slug: e[1].slug,
    }));

    const result = await Promise.all(
        districts.map((d) =>
            LocationProvider.updateOne(
                {
                    type: d.type,
                    provinceCode: d.provinceCode,
                    districtCode: d.districtCode,
                    countryCode: d.countryCode,
                },
                d,
                { upsert: true }
            )
        )
    );
    console.log("Update districts ", result);
}

export async function initLocation() {
    const isInitLocation = await ConfigProvider.getOne({
        key: "initedLocation",
        value: true,
    });
    if (!isInitLocation) {
        console.log("Start init location");
        await updateCountries();
        await updateCities("84");
        await updateDistricts("84");
        await ConfigProvider.updateOne(
            { key: "initedLocation" },
            { key: "initedLocation", value: true },
            { upsert: true }
        );
    }
}
