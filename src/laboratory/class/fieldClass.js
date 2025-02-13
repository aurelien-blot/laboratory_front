import VeeRulesService from "@/laboratory/services/veeRulesService.js";

export class FieldClass {

    constructor(name="",label="", type="text", defaultValue = null, rules =null, options = null) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.defaultValue = defaultValue;
        this.rules = rules;
        this.options = options;
    }

    isValid(value) {
        if (!this.rules) return true; // Pas de règles signifie que c'est toujours valide

        let hasValue = value !== undefined && value !== null && value !== '';
        // Vérifie chaque règle
        for (const rule in this.rules) {
            switch (rule) {
                case 'required':
                    if (this.rules[rule] && !hasValue) {
                        return false;
                    }
                    break;
                case 'integer':
                    if (hasValue && this.rules[rule] && !Number.isInteger(parseInt(value))) {
                        return false;
                    }
                    break;
                case 'decimal':
                    if (hasValue && this.rules[rule] && !new RegExp(`^\\d+(\\.\\d{1,${this.rules[rule]}})?$`).test(value)) {
                        return false;
                    }
                    break;
                case 'between':
                    if (hasValue && this.rules[rule] && (value < this.rules[rule][0] || value > this.rules[rule][1])) {
                        return false;
                    }
                    break;
                case 'uniqueValue':
                    if (hasValue && !VeeRulesService.isUniqueValue(value, this.rules[rule][1], this.rules[rule][0])) {
                        return false;
                    }
                    break;
                // Ajoutez d'autres règles ici si nécessaire
                default:
                    console.warn(`Rule "${rule}" is not implemented.`);
            }
        }

        return true;
    }
}