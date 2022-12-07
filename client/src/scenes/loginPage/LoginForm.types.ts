export interface IValuesRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: {
    name: string;
  };
}

export interface IValuesLogin {
  email: string;
  password: string;
}
