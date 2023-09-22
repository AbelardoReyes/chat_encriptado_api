import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        name: 'admin',
        email: 'admin@fmail.com',
        password: '1234',
        status: true,
        last_name: 'admin',
        username: 'admin',
        role_id: 1
      },
      {
        name: 'Abelardo',
        email: 'abela@gmail.com',
        password: '1234',
        status: true,
        last_name: 'Garcia',
        username: 'Abela',
        role_id: 2
      },
      {
        name: 'Brandon',
        email: 'brandon@gmail.com',
        password: '1234',
        status: true,
        last_name: 'Garcia',
        username: 'brandon',
        role_id: 2
      },
    ])
  }
}
