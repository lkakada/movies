export class Movie {
    _id: string;
    title: string;
    reviews: {
        name: string;
        star: number;
        content: string;
    }
}