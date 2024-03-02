import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(255),
      ]),
      password: schema.string({ trim: true }, [
        rules.maxLength(180),
      ]),
    })
    const validatedData = await request.validate({ schema: validationSchema })
    if (validatedData) {
      const email = validatedData.email
      const password = validatedData.password
      const token = await auth.use('api').attempt(email, password)
      return { msg: 'Login success', token: token.toJSON() }
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
    return { msg: 'Logout success' }
  }

  public async register({ request }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      last_name: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      username: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.maxLength(255),
      ]),
      password: schema.string({ trim: true }, [
        rules.maxLength(180),
      ]),
    })
    const validatedData = await request.validate({ schema: validationSchema })
    if (validatedData) {
      const user = new User()
      user.role_id = 2
      user.name = validatedData.name
      user.last_name = validatedData.last_name
      user.username = validatedData.username
      user.email = validatedData.email
      user.password = validatedData.password
      await user.save()
      return { msg: 'Register success', user: user }
    }
  }

  public async me({ auth }: HttpContextContract) {
    const user = auth.use('api').user
    return user
  }
}
