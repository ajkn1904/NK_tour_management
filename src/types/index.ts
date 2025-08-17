export type {ISendOTP, IVerifyOTP, ILogin} from './auth.type';

//generic types
export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}