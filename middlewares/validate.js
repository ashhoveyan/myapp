export default (schema, target) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[target], { abortEarly: false });

        if (!error) {
            return next();
        }

        const fields = {};
        error.details.forEach((detail) => {
            const key = detail.context.key;
            fields[key] = detail.message;
        });

        return res.status(422).json({
            message: 'Validation error',
            fields,
        });
    };
};