export const regexConstants = {
  password: new RegExp(
    '^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[A-Za-z.!@#$%^&*0-9]{6,16}$'
  ),
};
