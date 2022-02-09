import {
    Field as VeeField,
    Form as VeeForm,
    defineRule,
    ErrorMessage,
    configure
} from 'vee-validate';
import AllRules from '@vee-validate/rules';

export default {
    install(app) {
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        // Rules
        Object.keys(AllRules).forEach(rule => {
            defineRule(rule, AllRules[rule]);
        });

        configure({
            generateMessage: ctx => {
                const messages = {
                    required: `${ctx.field} is required.`,
                    min: `${ctx.field} is too short.`,
                    max: `${ctx.field} is too long.`,
                    min_value: `${ctx.field} is too low.`,
                    max_value: `${ctx.field} is too high.`,
                    alpha_spaces: `${ctx.field} may only contain alphabetical character.`,
                    email: `Email is not valid.`,
                    not_one_of: 'Due to restrictions, we do not accept users from this location.',
                    tos: 'You must accept Terms of Service.'
                }

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `${ctx.field} is invalid.`;

                return message;
            },
        });
    },
};