export class Facet {
    name: string;
    tags: Array<Tag>;

    constructor(name: string, tags: Array<Tag>) {

        this.name = name;
        this.tags = tags;
    }
}

export class Tag {
    name: string;
    count: number;

    constructor(name: string) {
        this.name = name;
        this.count = 1;
    }
}
