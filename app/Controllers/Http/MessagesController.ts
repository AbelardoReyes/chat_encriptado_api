// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws'

export default class MessagesController {

  public async index() {
    const messages = await Message.all()
    Ws.io.emit('getAllMessages', messages)
    return messages
  }

  public async store({ request }) {
    const validationSchema = schema.create({
      message: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      socket_id: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
    })
    const validatedData = await request.validate({ schema: validationSchema })
    if (validatedData) {
      const message = new Message()
      message.message = validatedData.message
      message.socket_id = validatedData.socket_id
      message.user_id = 1
      await message.save()
      return { msg: 'Message created', message: message }
    }
  }

  public async show({ params }) {
    const message = await Message.find(params.id)
    return message
  }
}
