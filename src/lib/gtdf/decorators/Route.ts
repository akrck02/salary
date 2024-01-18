export const Routes = []

export function Route(value : string | string[]) {    
    return function(target: any) {
        console.debug(`Route registered /${value}`);
        target.instance().routes = value;
        Routes.push(target.instance());
    };
}