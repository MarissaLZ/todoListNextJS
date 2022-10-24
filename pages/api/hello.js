// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// bc next allows for server sided rendering it allows us to create our own api
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" })
}
