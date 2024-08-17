import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

export default async function handler(req,res) {
  if (req.method === 'PUT') {
    const { userId, siteId, like } = req.body;

    const data = 
    like ? await client
      .patch(siteId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit()
    : await client
      .patch(siteId)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();

    res.status(200).json(data);
  }
}
