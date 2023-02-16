export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    type: string;
    verificationStatus: string;
    authToken: string;
    slug: string;
    resetTokenExpiration: Date;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
