import {defineRule} from "vee-validate";

export default class VeeRulesService{

    static defineUniqueValueRule = () => {
        defineRule('uniqueValue', (value, [attribute, list]) => {
            if (!value) {
                return true; // Si la valeur est vide, on considère qu'elle est valide
            }

           return VeeRulesService.isUniqueValue(value, list, attribute);
        });
    };

    static isUniqueValue(value, list, attribute) {
        return  list.filter(item => item[attribute] === value).length===0;
    }

    static defineDecimalRule = () => {
        defineRule('decimal', (value, [decimals]) => {
            if (!value) return true;
            const regex = new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`);
            return regex.test(value);
        });
    };
}