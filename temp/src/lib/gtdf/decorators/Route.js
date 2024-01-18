export const Routes = [];
export function Route(value) {
    return function (target) {
        console.debug(`Route registered /${value}`);
        target.instance().routes = value;
        Routes.push(target.instance());
    };
}
