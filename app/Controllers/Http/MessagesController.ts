// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws'

export default class MessagesController {

  public async index() {
    const messages = await Message.all()
    return messages
  }

  public async store({ request }) {
    console.log("Request:", request.all())
    const validationSchema = schema.create({
      message: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      socket_id: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      user_id: schema.number([
        rules.unsigned(),
      ]),
    })
    const message = new Message()
    message.message = request.all().message
    message.socket_id = request.all().socket_id
    message.user_id = request.all().user_id
    await message.save()
    return { msg: 'Message created', message: message }
  }

  public async show({ params }) {
    const message = await Message.find(params.id)
    return message
  }
}
