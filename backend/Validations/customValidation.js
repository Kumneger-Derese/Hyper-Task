import validator from 'validator';

const password = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      `Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    );
  }

  return value;
};

export { password };
