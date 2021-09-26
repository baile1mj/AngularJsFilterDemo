namespace Demo.MainView {
    import IController = angular.IController;
    import Course = Models.Course;
    import Filter = Filtering.Filter;
    import Section = Models.Section;

    export class MainViewModel {
        courses: Course[];
        courseFilters: Filter[];
        sectionFilters: Filter[];

        filteredCourses(): Course[] {
            return this.courses.filter((c: Course) => !c.filterState.isFiltered());
        }

        filteredSections(sections: Section[]): Section[] {
            return sections.filter((s: Section) => !s.filterState.isFiltered());
        }
    }

    export class MainController implements IController {
        vm: MainViewModel = new MainViewModel();

        constructor() {
            this.vm.courses = TestData.Generator.createTestCourses();
            this.vm.courseFilters = TestData.Generator.createCourseFilters();
            this.vm.sectionFilters = TestData.Generator.createSectionFilters();

            this.vm.courses.forEach((c: Course) => {
                this.vm.courseFilters.forEach((f: Filter) => f.addRecord(c));
                this.vm.sectionFilters.forEach((f: Filter) => f.addRecords(c.sections));
            });
        }

        $onInit = (): void => {};
    }

    filteringDemo.controller('mainController', MainController);
}