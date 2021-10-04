import axios from 'axios';

 const createUser = async (req, res) => {
    const  {userId, userName} = req.body;

    axios
        .post('https://api.chatengine.io/projects/people',
        {username: userName, secret: userId},
        {headers: {'Private-Key': process.env.chat_engine_private_key}},
        )
        .then(apiResponse => {
            res.json({
                body: apiResponse.data,
                error: null,
            });
        })
        .catch(() => {
            res.json({
                body: null,
                error: 'Error creating user',
            });
        });
  };

export default createUser;