type OrderType = {
    stockId: string;
    quantity: number;
    _id: string;
    stock: {
        price: number;
    };
};

export type { OrderType };
