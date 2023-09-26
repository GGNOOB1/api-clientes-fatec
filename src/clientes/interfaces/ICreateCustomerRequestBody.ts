import CityDto from '../dtos/city.dto';
import GenderCustomer from '../enums/genderCustomer';
import StatusCustomer from '../enums/statusCustomer';

export default interface ICreateUserRequestBody {
  id: number;
  identify_document: string;
  name: string;
  address: string;
  phone: string;
  birthdate: Date;
  status: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  // city: {
  //   name: string;
  //   state: {
  //     name: string;
  //   };
  // };
  imgpath: string;
}
