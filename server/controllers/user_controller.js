
const getUserInfo = (req, res, next)=> {
  console.log("find user")
  Store.findOne(({
      where: {id_store:req.body.storeId}
  }))
  .then((store) => {
      // found
      res.status(200).json({message: "workout created", data:JSON.parse(store.data)});
      // not found
      res.status(404).end()
  })
  .catch(err => {
      console.log(err);
      res.status(502).json({message: "error while creating the Exericise"});
  });
}

const createUser = (req, res, next)=> {
  // const note = request.body
  // console.log(note)
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  // response.json(note)
  console.log("create user")
  if (true) {

  } else {

  }

  // .then((store) => {
  //     res.status(200).json({message: "workout created", data:JSON.parse(store.data)});
  // })
  // .catch(err => {
  //     console.log(err);
  //     res.status(502).json({message: "error while creating the Exericise"});
  // });
}

const deleteUser = (req, res, next)=> {

  console.log("create user")
  if (true) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }

  // res.status(404).end() // no data
  // .then((store) => {
  //     res.status(200).json({message: "workout created", data:JSON.parse(store.data)});
  // })
  // .catch(err => {
  //     console.log(err);
  //     res.status(502).json({message: "error while creating the Exericise"});
  // });
}

export {deleteUser, createUser}