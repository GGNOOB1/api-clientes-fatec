import { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import authenticateToken from '../../auth/middlewares/authenticateToken';

const clientesRouter: Router = Router();
const customerController = new CustomerController();

clientesRouter
  .route('/')
  .post(customerController.createClient.bind(customerController))
  .get(
    authenticateToken,
    customerController.listAllCustomers.bind(customerController),
  );

clientesRouter
  .route('/:id')
  .all(authenticateToken)
  .get(customerController.listClient.bind(customerController))
  .put(customerController.testFunction)
  .patch(customerController.updateCliente.bind(customerController))
  .delete(customerController.deleteCliente.bind(customerController));

export default clientesRouter;
