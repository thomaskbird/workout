import { NextApiHandler } from 'next'

const handler: NextApiHandler = (_req, res) =>
  res.status(200).json({
    message: 'Just here for health checks'
  })

export default handler
