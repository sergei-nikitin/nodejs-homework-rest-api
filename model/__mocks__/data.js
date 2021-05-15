const contacts = [
    {
        "_id": "608eb56e3c2a450e4017d950",
        "name": "Thomas Lucas","email":"nec@Nulla.com",
        "phone": "(704) 398-7993",
        "favorite": false
    },
    {
        "_id": "608eb56e3c2a450e4017d94f",
        "name": "Simon Morton","email":"dui.Fusce.diam@Donec.com",
        "phone": "(233) 738-2360",
        "favorite": true
    }
]

const newContact = {
    name: 'New',
    phone: 1234567890,
    favorite: false,
}

const User = {
    _id: "609ccd2f0f0cc20952812fd1",
    subscription: "starter",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWNjZDJmMGYwY2MyMDk1MjgxMmZkMSIsImlhdCI6MTYyMTAyMDYxMCwiZXhwIjoxNjIxMDI3ODEwfQ.kE1lE76IeZbcY8Na_PyhTQy0M5Po57WJelp9N3dNQiI",
    email: "Nikitin_S@i.ua",
    password: "$2a$06$ojY4bb.MmDLYXl9aFSykFOuJXImtuCp5MMSqM84m4olbR0idRVHZu",
    avatar: "../../test/default-avatar.jpeg",
    createdAt: "2021-05-13T06:54:39.580Z",
    updatedAt: "2021-05-13T08:24:09.853Z"
}

  
  const users = []
  users[0] = User

  const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }