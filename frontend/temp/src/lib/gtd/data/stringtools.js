export default class StringTools {
    static toNormalCase(str) {
        if (str.length < 2) {
            return str.toUpperCase();
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
        ;
    }
}
