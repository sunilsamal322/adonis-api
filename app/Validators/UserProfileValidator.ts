import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(30)
    ]),
    mobileNumber: schema.string({trim:true},[
      rules.regex(/^[0-9]{10}$/)
    ]),
    gender: schema.enum(
      ['MALE','FEMALE'] as const
    ),
    dateOfBirth: schema.date({
      format: 'yyyy-MM-dd',
    },)
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "required": "{{field}} is required",
    "name.minLength":"Name should be at least of 3 characters",
    "name.maxLength":"Name should be at most of 30 characters",
    "string":"{{field}} should be in string format",
    "mobileNumber.regex":"Mobile number should be 10 digits",
    "gender.enum":"Gender should be either MALE or FEMALE",
    "dateOfBirth.date":"Enter valid date, Date format should be [yyyy-mm-dd]",
    "dateOfBirth.date.format":"Enter valid date, Date format should be [yyyy-mm-dd]"
  };
}
