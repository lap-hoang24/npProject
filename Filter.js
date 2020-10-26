

class Filter {
    constructor(name) {
        this.name = name;
    }

    getFilterResults(data) {
        return data[1];
    }
}

data = ['a', 'b', 'c', 'd'];
const haha = new Filter('haha');

console.log(haha.getFilterResults(data))