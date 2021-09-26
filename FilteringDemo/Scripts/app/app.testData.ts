namespace Demo.TestData {
    import Course = Models.Course;
    import Section = Models.Section;
    import Filter = Filtering.Filter;
    import FilterOption = Filtering.FilterOption;

    export class Generator {
        public static createTestCourses(): Course[] {
            let testRecords: Course[] = [];
            let newCourse: Course;
            
            newCourse= new Course("ENG", "101", "Freshman Composition");
            newCourse.addSection(new Section("22412345", ["Mo", "We"], "Anspach 107", "Face to Face", 25, 25));
            newCourse.addSection(new Section("22412346", ["Tu", "Th"], "Online", "Fedex", 25, 0));
            newCourse.addSection(new Section("22412347", ["Mo", "We", "Fr"], "Anspach 106", "Face to Face", 50, 47));
            newCourse.addSection(new Section("22412348", ["Tu"], "The Moon", "Online Synchronous", 15, 7));
            testRecords.push(newCourse);

            newCourse = new Course("ENG", "201", "Freshman Composition");
            newCourse.addSection(new Section("22412345", ["Mo", "We"], "Anspach 107", "Face to Face", 25, 25));
            newCourse.addSection(new Section("22412346", ["Tu", "Th"], "Online", "Fedex", 25, 0));
            newCourse.addSection(new Section("22412347", ["Mo", "We", "Fr"], "Anspach 106", "Face to Face", 50, 47));
            newCourse.addSection(new Section("22412348", ["Tu"], "The Moon", "Online Synchronous", 15, 7));
            testRecords.push(newCourse);

            newCourse = new Course("MTH", "105", "Intermediate Algebra");
            newCourse.addSection(new Section("22412355", ["Mo", "Tu", "We", "Th"], "Pearce 307", "Face to Face", 25, 19));
            newCourse.addSection(new Section("22412356", ["Tu", "Th"], "Pearce 201", "Face to Face", 15, 4));
            newCourse.addSection(new Section("22412357", ["Mo", "We", "Fr"], "McDonald's", "Online Asynchronous", 50, 47));
            newCourse.addSection(new Section("22412358", ["Tu"], "The Internet", "Online Synchronous", 20, 12));
            testRecords.push(newCourse);

            return testRecords;
        }

        public static createCourseFilters(): Filter[] {
            let filters: Filter[] = [];
            let courseLevelFilter = new Filter("Course Level");
            courseLevelFilter.addOption(new FilterOption("100", courseLevelFilter, (c: Course) => c.level <= 1));
            courseLevelFilter.addOption(new FilterOption("200", courseLevelFilter, (c: Course) => c.level >= 2 && c.level < 3));
            courseLevelFilter.addOption(new FilterOption("300", courseLevelFilter, (c: Course) => c.level >= 3 && c.level < 4));
            courseLevelFilter.addOption(new FilterOption("400", courseLevelFilter, (c: Course) => c.level >= 4 && c.level < 5));
            courseLevelFilter.addOption(new FilterOption("500+", courseLevelFilter, (c: Course) => c.level >= 5));
            filters.push(courseLevelFilter);

            return filters;
        }

        public static createSectionFilters(): Filter[] {
            let filters: Filter[] = [];
            let availabilityFilter = new Filter("Availability");

            availabilityFilter.addOption(new FilterOption("Open Seats", availabilityFilter, (s: Section) => !s.isFull()));
            availabilityFilter.addOption(new FilterOption("Full", availabilityFilter, (s: Section) => s.isFull()));
            filters.push(availabilityFilter);

            return filters;
        }
    }
}