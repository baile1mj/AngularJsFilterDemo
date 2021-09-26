namespace Demo.Models {
    import IFilterable = Filtering.IFilterable;
    import FilterState = Filtering.FilterState;

    export class Course implements IFilterable {
        filterState: FilterState = new FilterState();
        sections: Section[] = [];
        level: number;

        constructor(
            public subject: string,
            public number: string,
            public title: string
        ) {
            this.level = parseInt(number.substr(0, 1));
        }

        addSection(newSection: Section): void {
            this.sections.push(newSection);
        }
    }

    export class Section implements IFilterable {
        filterState: FilterState = new FilterState();

        constructor(
            public number: string,
            public days: string[],
            public location: string,
            public delivery: string,
            public capacity: number,
            public available: number
        ) { }

        isFull(): boolean {
            return this.available === 0;
        }

        getDaysForDisplay(): string {
            return this.days.join(', ');
        }
    }
}