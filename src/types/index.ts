import type { ComponentType } from 'react';

export type {ISendOTP, IVerifyOTP, ILogin} from './auth.type';

//generic types
export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}


export interface ISidebarItems {
    title: string;
    items: {
        title: string;
        url:string;
        component: ComponentType
    }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";