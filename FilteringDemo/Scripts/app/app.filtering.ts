namespace Demo.Filtering {
    export interface IFilterable {
        filterState: FilterState;
    }

    export class FilterState {
        private appliedFilters: Filter[] = [];
        private childFilters: IFilterable[] = [];

        applyFilter(filter: Filter): void {
            this.appliedFilters.push(filter);
        }

        removeFilter(filter: Filter): void {
            let index = this.appliedFilters.indexOf(filter);
            this.appliedFilters.splice(index, 1);
        }

        considerChildren(children: IFilterable[]): void {
            this.childFilters = children;
        }

        isFiltered(): boolean {
            return this.isNotVisible() || this.noChildrenVisible();
        }

        private isNotVisible(): boolean {

            return this.appliedFilters.length > 0;
        }

        private noChildrenVisible(): boolean {
            return this.childFilters.length > 0 && this.childFilters.every((c: IFilterable) => c.filterState.isFiltered());
        }
    }

    type OptionCandidateSelector = (candidate: any) => boolean;

    export class FilterOption {
        private _records: IFilterable[] = [];
        private _isApplied: boolean = false;

        constructor(
            public displayName: string,
            private parent: Filter,
            private shouldWatch: OptionCandidateSelector
        ) { }

        isApplied(): boolean {
            return this._isApplied;
        }
        
        toggle(): void {
            if (this._isApplied) {
                this.remove();
            } else {
                this.apply();
            }
        }

        apply(): void {
            this._records.forEach((record: IFilterable): void => record.filterState.applyFilter(this.parent));
            this._isApplied = true;
        }

        remove(): void {
            this._records.forEach((record: IFilterable): void => record.filterState.removeFilter(this.parent));
            this._isApplied = false;
        }

        evaluateCandidate(record: IFilterable) {
            if (this.shouldWatch(record)) {
                this._records.push(record);
            }
        }
    }

    export class Filter {
        private options: FilterOption[] = [];

        constructor(
            public displayName: string
        ) { }

        addOption(newOption: FilterOption): void {
            this.options.push(newOption);
        }

        getOptions(): FilterOption[] {
            return [...this.options];
        }

        addRecord(record: IFilterable) {
            this.options.forEach((opt: FilterOption) => opt.evaluateCandidate(record));
        }

        addRecords(records: IFilterable[]) {
            records.forEach((rec: IFilterable) => this.addRecord(rec));
        }
    }
}