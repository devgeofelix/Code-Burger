import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store (request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    const userEmailOrPassordInconrrect = () => {
      return response.status(401).json({ error: 'Dados incorretos!' })
    }

    if (!(await schema.isValid(request.body))) userEmailOrPassordInconrrect()

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email }
    })
    if (!user) userEmailOrPassordInconrrect()

    if (!(await user.checkPassword(password))) userEmailOrPassordInconrrect()

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin
    })
  }
}

export default new SessionController()
