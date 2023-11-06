const domain = process.env.NEXT_PUBLIC_BE_DOMAIN

export const API = {
    login:{
        serverside:     domain+'/login_s',
        browser:        domain+'/login_b',},
        
    role:       domain+'/role/get',

    userinfo:{
        load:       domain+'/userinfo/get',
        update:     domain+'/userinfo/update',},

    acc:{
        load:       domain+'/admin/account/load',
        create:     domain+'/admin/account/create',
        update:     domain+'/admin/account/update',},

    store:{
        add:        domain+'/admin/store/add',
        update:     domain+'/admin/store/update',
        img:        domain+'/admin/store/img/',
        load:       domain+'/admin/store/load',},

    warehouse:{
        add:            domain+'/admin/warehouse/add',
        update:         domain+'/admin/warehouse/update',
        img:            domain+'/admin/warehouse/img/',
        load:           domain+'/admin/warehouse/load',
        load_av_wk:     domain+'/admin/warehouse_keeper/load_available',
        load_wk:        domain+'/admin/warehouse_keeper/load',},

    st_lct:{
        add:        domain+'/warehouse_keeper/storage_location/add',
        update:     domain+'/warehouse_keeper/storage_location/update',
        img:        domain+'/warehouse_keeper/storage_location/img/',
        load:       domain+'/warehouse_keeper/storage_location/load',
        load_prd:   domain+'/warehouse_keeper/storage_location/product/load',
        load_byprd: domain+'/warehouse_keeper/storage_location/load_byProductId',},

    import:{
        create:         domain+'/business/import/create',
        load:           domain+'/warehouse_keeper/import/load',
        load_details:   domain+'/warehouse_keeper/import/detail/load',
        update:         domain+'/warehouse_keeper/import/update',},

    export:{
        create:         domain+'/business/export/create',
        load:           domain+'/warehouse_keeper/export/load',
        load_details:   domain+'/warehouse_keeper/export/detail/load',
        update:         domain+'/warehouse_keeper/export/update',},

    product:{
        add:        domain+'/business/product/add',
        update:     domain+'/business/product/update',
        load:       domain+'/business/product/load',
        img:        domain+'/business/product/img/',
        prices:     domain+'/business/product/prices',
        inventory_report:   domain+'/business/product/report/inventory',
        expirydate_report:  domain+'/business/product/report/expiryDate',
        load_batch:         domain+'/business/product_batch/load_byProductId',},

    product_tag:{
        load:       domain+'/business/product_tag/load',
        add:        domain+'/business/product_tag/add',
        update:     domain+'/business/product_tag/update',
        load_byprd: domain+'/business/product_tag/load_byProductId',
        load_category:  domain+'/business/product_tag/category/load',}

}