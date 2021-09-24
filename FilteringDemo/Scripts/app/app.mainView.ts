namespace Filtering.MainView {
    import IController = angular.IController;

    export class MainViewModel {
        testMessage: string = 'Hello, World!';
    }

    export class MainController implements IController {
        vm: MainViewModel;

        constructor() {
            this.vm = new MainViewModel();
        }

        $onInit = (): void => {};
    }

    filteringDemo.controller('mainController', MainController);
}