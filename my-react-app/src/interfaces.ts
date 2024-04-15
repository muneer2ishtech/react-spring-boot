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

interface Page<T> {
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