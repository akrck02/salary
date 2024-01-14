/* class decorator */
export function StaticImplements() {
    return (constructor) => { constructor; };
}
