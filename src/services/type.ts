import { number } from "prop-types"

export interface MasterData {
    id: string;
    value: string;
}
export interface ITruckInfo {
    __typename: 'ITruckInfo';
    id: string;
    name: string;
    contact_code: string;
    price: number;
    tax: number;
    model: MasterData;
    manufacture: MasterData;
    mfg: number;
    km: number;
    size: number;
    status: number;

}

export interface Message {
    id: number,
    buyer_id: number,
    receiver_id: number,
    chat_room_id: number,
    content: string,
    type: number,
    seller_id: number,
    created_at: string,
    updated_at: string,
}

export interface INotificationContent {
    numberOfSearchResult?: number;
    text: string
}
export interface ListResponse<T> {
    __typename: "ListResponse";
    data: T[];
    total: number;
    last_page: number;
};
export interface ObjectResponse<T> {
    __typename: "ObjectResponse";
    data: T;
    status?: number;
};

export interface BaseResponse {
    __typename: "BaseResponse";
};

export interface ErrorResponse {
    __typename: "ErrorResponse";
    message: string;
    errors: any[];
    status?: number
};

export interface Item {
    id: number;
    label: string;
    value: string | number;
    image?: string;
}


export interface Auth {
    __typename?: "Auth";
    data: {
        access_token: string,
        expires_in?: number,
        user_id?: number
    }
};

export interface TruckBasicInfo {
    __typename?: "TruckBasicInfo";
    body_type_id: Item[];
    car_size_id: string;
    car_weight_id: Item[];
    manufacture_id: Item[];
    model_year_y: number;
    model_year_m: number;
    km_used: string | undefined;
    mile_used: string;
    maximum_capacity: number | undefined;
    total_weight: string;
    car_inspection_date: string;
    type: string;
    chassis_number: string;
    has_power_gate: number;
    has_high_roof: number;
    has_bed: number;
    capicity: string;
    mission: Item[];
    engine_model: string
    horsepower: string;
    has_turbo: number;
    has_4wd: number;
    mirror: number;
    has_shock_absorber: number;
    has_tachograph: number;
    has_etc: number;
    has_back_monitor: number;
    has_adblue: number;
    tank_capacity_main: string;
    tank_capacity_sub: string;
    suspension: Item[];
    stock_location_id: Item[];
    loan_payment_amount: string;
    fuel_id: Item[];
    fuel_description: string;

}

export interface SideDoor {
    position: string;
    width: number;
    height: number
}
export interface TruckBodyInfo {
    __typename?: "TruckBodyInfo";
    outside_size_length: string;
    outside_size_width: string;
    outside_size_height: string;
    inside_size_length: string;
    inside_size_width: string;
    inside_size_height: string;
    floor_material_id: Item[];
    joist_material_id: Item[];
    has_built_in_body: number;
    lashing_rail_id: Item[];
    gate_width: string;
    gate_height: string;
    inner_hook: string;
    joroder_groove: string;
    pallet_roller: string;
    has_side_door: number;
    side_door_type_id: Item[];
    side_door_size: SideDoor[];
    stance: string;
    aori_material: string;
    aori_height: string;
    floor_clearance_previous: string;
    floor_clearance_rear: string;
    floor_clearance_description: string;
    manufacture_power_gate: string;
    power_gate_spec_id: number;
    power_gate_width: string;
    power_gate_height: string;
    power_gate_description: string;
    manufacturer_freezer: string;
    body_year: string;
    freezer_temperature: string[];
    has_freezer_standby: number;
    freezer_sub_engine_id: Item[];
    has_two_work: number;
    drain_hole_versus: string;
    drain_hole_individual: string;
    insulation_thickness: string;
    freezer_description: string;
    has_evaporator: number;
}




export interface UserInfo {
    __typename?: "UserInfo",
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string,
    password_confirmation: string,
    company_name: string,
    business_type: number,
    zipcode: string,
    prefecture: string,
    city: string,
    address: string,
}

interface MasterDatObject {
    image?: string;
    label: string;
    value: string | number

}

export interface MasterDataResponse {
    __typename?: "MasterDataResponse",
    check: string[];
    body_type: Item[];
    car_weight: Item[];
    manufacture: Item[];
    gear: Item[];
    mirror: Item[];
    provinces: Item[];
    fuel: Item[];
    registration: Item[];
    floor_material: Item[];
    joist_material: Item[];
    lashing_rail: Item[];
    side_door_type: Item[];
    side_door_position: Item[];
    tail_lift: Item[];
    freezer_sub_engine: Item[];
    car_size: Item[];
    body_year: Item[];
    japan_year: Item[];
    business_type: Item[];
    order_type: Item[];
    max_weight: Item[];
    province_groups: any;
    contact_type: Item[];
    freezing_type: Item[];
    tag: Item[];
    photo_position: Item[];
    license_type: Item[];
    shock_absorber: Item[];
}

export interface SideDoorItem {
    position: any;
    width: any;
    height: any;
}

export interface TBlogs {
    total: number,
    last_page: number,
    data: {
        posts: Blog
    },
    current_page: number
}

export interface Blog {
    image_path_full: string,
    title: string,
    publish_at: string,
    content: any,
    tags: []
}

export interface Truck {
    total: number,
    last_page: number,
    data: TruckInfo[],
    current_page: number
}

export interface TruckInfo {
    __typename: "TruckInfo";
    id: number,
    user_id: number,
    name: string,
    contact_code: string,
    price: number,
    max_weight: number,
    car_weight: number,
    max_weight_id: number,
    stock_location_id: number,
    body_type_id: number,
    manufacture_id: number,
    car_size_id: number,
    mission_id: number,
    drive_system_id: number,
    power_gate_id: number,
    shock_system_id: number,
    fuel_id: number,
    km_used: number,
    model_year: number,
    num_of_bed: number,
    truck_body_length: number,
    truck_body_width: number,
    truck_body_height: number,
    cabin_width: number,
    truck_overall_length: number,
    truck_overall_width: number,
    truck_overall_height: number,
    is_signed_contract: number,
    approve: number,
    status: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    thumb: {
        id: number,
        car_id: number,
        url: string,
        type: number,
        url_full: string,
    },
    has_side_door: number,
    car_weight_id: number,
    model_year_y: number,
    model_year_m: number,
    mile_used: number,
    total_weight: number,
    registration_id: number,
    registration_date: string,
    model_car: string,
    chassis_number: string,
    has_tail_lift: number,
    has_high_roof: number,
    has_bed: number,
    capacity: string,
    gear_id: number,
    model_engine: string,
    horsepower: string,
    has_turbo: number,
    has_4wd: number,
    mirror: number[],
    mirror_items: Item[],
    tank_capacity_main: string,
    tank_capacity_sub: string,
    has_shock_absorber: number,
    has_tachograph: number,
    has_etc: number,
    has_back_monitor: number,
    has_adblue: number,
    loan_payment: number,
    fuel_description: string,
    outside_size_length: number,
    outside_size_width: number,
    outside_size_height: number,
    inside_size_length: number,
    inside_size_width: number,
    inside_size_height: number,
    floor_material_id: number,
    joist_material_id: number,
    has_built_in_body: number,
    lashing_rail_id: number,
    gate_width: number,
    gate_height: number,
    inner_hook: number,
    joroder_groove: number,
    pallet_roller: number,
    side_door_type_id: number,
    side_door_size: SideDoorItem[],
    stance: number,
    aori_material: string,
    aori_height: number,
    floor_clearance_previous: number,
    floor_clearance_rear: number,
    floor_clearance_description: string,
    manufacture_tail_lift: string,
    tail_lift_id: number,
    tail_lift_width: number,
    tail_lift_height: number,
    tail_lift_description: string,
    manufacturer_freezer: string,
    body_year: number,
    freezer_temperature: number,
    freezer_temperature_1: number,
    freezer_temperature_2: number,
    freezer_temperature_3: number,
    has_freezer_standby: number,
    freezer_sub_engine_id: number,
    has_evaporator: number,
    drain_hole_versus: number,
    drain_hole_individual: number,
    insulation_thickness: number,
    freezer_description: string,
    attribute_value: {
        freezing_type: string,
        body_type_id: string,
        car_size_id: string,
        car_weight_id: string,
        manufacture_id: string,
        max_weight_id: string,
        registration_id: string,
        has_tail_lift: string,
        has_high_roof: string,
        has_bed: string,
        gear_id: string,
        has_turbo: string,
        has_4wd: string,
        mirror: string[],
        has_shock_absorber: string,
        has_tachograph: string,
        has_etc: string,
        has_back_monitor: string,
        has_adblue: string,
        stock_location_id: string,
        fuel_id: string,
        floor_material_id: string,
        joist_material_id: string,
        lashing_rail_id: string,
        side_door_type_id: string,
        tail_lift_id: string,
        has_freezer_standby: string,
        freezer_sub_engine_id: string,
        has_evaporator: string,
        has_side_door: number,
        tag: string[],
        has_built_in_body?: string,
        manufacture_tail_lift: string,
    },
    model_year_jp: string,
    medias: Media[],
    has_favorite: number | boolean,
    favorite_count: number,
    favorite: any,
    is_unknown_distance: number,
    has_scale_measured: number,
    orders_count: number,
    management_note: string,
    tag: number[],
    step?: number,
    freezing_type: number,
}

export interface Media {
    id: number;
    url_full: string,
    photo_position?: number,
    photo_position_text?: string,
}

export interface ParamsLogin {
    phone: string,
    password: string
}


export interface InputInventoryForm {
    contact_code: string;
    type: number;
    content: string;
    car_id?: number;
}


export interface SearchForm {
    isGetAll?: boolean;
    keyword?: string,
    body_type?: any,
    manufacture?: any,
    size?: any,
    body_year_id?: any,
    price?: any,
    model_year?: any,
    gear?: any,
    max_weight?: any,
    has_tail_lift?: any,
    has_high_roof?: any,
    has_bed?: any,
    has_4wd?: any,
    has_shock_absorber?: any,
    has_side_door?: any,
    has_freezer_standby?: any,
    freezer_sub_engine?: any,
    has_evaporator?: any,
    stock_location?: any,
    registration: any,
    q?: string;
    license_type?: any
}

export interface InputContactForm {
    type: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    content: string;
    company_name: string;
}

export interface ChatRoomResponse {
    __typename?: "ChatRoomResponse",
    buyer_id: number,
    buyer_read_at: string,
    buyer: UserInfo,
    car_id: number,
    created_at: string,
    deleted_at: string,
    order: InputInventoryResponse,
    id: number,
    order_id: number,
    seller_id: number,
    seller: UserInfo,
    seller_read_at: string,
    last_message: {
        content: string;
        created_at: string;
        type: number;
    },
    updated_at: string,
}
export interface InputInventoryResponse {
    __typename: "InputInventoryResponse",
    car: TruckInfo,
    chat_room: ChatRoomResponse
}


export interface TRecentSearch {
    current_page: number,
    data: RecentSearch[],
    total: number | undefined,
    last_page: number | undefined,
}
export interface RecentSearch {
    created_at: string,
    deleted_at: string,
    query: TQuery
}

export interface TQuery {
    body_type?: any,
    manufacture?: any,
    size?: any,
    price?: any,
    gear?: any,
    max_weight?: any,
    has_tail_lift?: any,
    has_high_roof?: any,
    has_bed?: any,
    has_4wd?: any,
    has_shock_absorber?: any,
    has_side_door?: any,
    has_freezer_standby?: any,
    freezer_sub_engine?: any,
    has_evaporator?: any,
    stock_location?: any,
    registration: any,
    q?: string;
    license_type?: any,
    inside_size_width: any,
    inside_size_height: any,
    inside_size_length: any,
    outside_size_width: any,
    outside_size_length: any,
    outside_size_height: any,
    model_year: any,
    km_used: any,
    freezing_type: any
}


export interface TradingResponse {
    __typename: "TradingResponse";
    car: TruckInfo;
    car_id: number;
    chat_room: ChatRoomResponse;
    user_seller_id: number;
    user_buyer_id: number;
    buyer: UserInfo;
    seller: UserInfo;
    created_at: string;
    updated_at: string;
    id: number;
}


export interface NotiResponse {
    __typename: "NotiResponse";
    id: number;
    title: string;
    content: string;
    is_new: number;
    created_at: string;
    updated_at: string;
}

export interface BlogTag {
    id: number;
    name: string;
    hot: number;
}
export interface BlogResponse {
    post: Blog;
    tags: any;
    post_related: Blog[];

}

export interface BannerResponse {
    id: number;
    title: string;
    content: string;
    image_full_path: string;
    publish_at: string;
}


export interface CarAnalystResult {
    average: number
    car_axis_id: number
    car_category_id: number
    car_freezer_type_id: number
    car_length_id: number
    car_maker_id: number
    car_option_2diff_flag: number
    car_option_24_flag: number
    car_option_25_flag: number
    car_option_27_flag: number
    car_option_51_flag: number
    car_option_66_flag: number
    car_transmission_id: number
    car_type_id: number
    car_width_id: number
    elapsed_days: number
    handmadebody_exist_id: number
    highroof_exist_id: number
    max_weight: number
    pg_exist_id: number
    run_distance: number
    turbo_exist_id: number
}