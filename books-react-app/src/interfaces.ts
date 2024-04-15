export interface SignUpFormData {
    username: string;
    password: string;
    repeatPassword: string;
}

export interface SignInFormData {
    username: string;
    password: string;
}

export interface NewBook {
    id: null;
    title: string;
    author: string;
    year: number;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    price: number;
}

export interface Page<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        pageNumber: number;
        pageSize: number;
        offset: number;
        unpaged: boolean;
        paged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
    // Add other properties as needed
}
