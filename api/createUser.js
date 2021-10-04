import axios from 'axios';

 const createUser = async (req, res) => {
    const  {userId, userName} = req.body;

    const config = {
        method: 'post',
        url: 'https://api.chatengine.io/users/',
        headers: {
            'PRIVATE-KEY': process.env.chat_engine_private_key
        },
        data : {username: userName, secret: userId}
    };

    axios(config)
        .then(apiResponse => {
            res.json({
                body: apiResponse.data,
                error: null,
            });
        })
        .catch((err) => {
            res.json({
                body: null,
                error: err,
            });
        });
  };

export default createUser;