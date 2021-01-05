import { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  _id: string
  name: string
  email: string
  cellphone: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name, email, cellphone } = req.body

    if (!name || !email || !cellphone) {
      return res.status(400).json({ error: 'Missing core parameters.' })
    }

    const { db } = await connect()
    const response = await db.collection('users').insertOne({
      name,
      email,
      cellphone
    })

    return res.status(200).json(response.ops[0])
  } else {
    return res.status(400).json({ error: 'Wrong request method.' })
  }
}
