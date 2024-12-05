import mongoose, { model, models, Schema } from 'mongoose';

const contactSchema = new Schema({
    full_name: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        lowecase: true,
        validate: {
            validator: (value) => {
                const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return value.match(regexp);
            },
            /* 
            Explaining the Email Validation Pattern.

            /^ => starts with
            (
                (
                    [^<>()[\]\\.,;:\s@"]+ => char.set of chars negating special chars not even one or more of them.
                    (
                        \. => Literally '.' means capturing group denoting name starts with a dot
                        [^<>()[\]\\.,;:\s@"]+ => char.set of chars negating special chars not even one or more of them.
                    )* => .name capturing group. (OPTIONAL)
                ) => user.name capturing group.

                | => Boolean OR

                (".+")  => Any char. except new line inside a string.
            ) => username capturing group.
            @ => Literally '@'.
            (
            \[ => starts with literal '['
            [0-9]{1,3}\. => char.set of digits with length min. 1 to max. 3
            [0-9]{1,3}\. => char.set of digits with length min. 1 to max. 3
            [0-9]{1,3}\. => char.set of digits with length min. 1 to max. 3
            [0-9]{1,3}\. => char.set of digits with length min. 1 to max. 3
            \] => ends with literal ']'
            ) => IP address capturing group.
            
            | => Boolean OR

            (
                (
                    [a-zA-Z\-0-9]+ => char.set of letters & digits with length (+) min. 1 to max. infinite for domain.
                    \. => Literally '.' for separating domain name with subdomains or domain extension, tld (top level domain).
                ) => 
                +[a-zA-Z]{2,} => char.set of letters with length min. 2 to max. infinite 
            ) => domain name capturing group.
            */
            message: "Please enter a valid email address"
        }
    },
    phone_number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default models.Contact || model('Contact', contactSchema);