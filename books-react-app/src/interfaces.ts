export interface SignUpFormData {
    username: string;
    password: string;
    repeatPassword: string;
}

export interface SignInFormData {
    username: string;
    password: string;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    price: number;
}
