import bcrypt from 'bcryptjs'

const users = [

  {
    firstname: 'Admin',
    lastname: 'user',
    email: 'account@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstname: 'James',
    lastname: 'rollin',
    email: 'james@example.com',
    amount: '40000',
    accountNumber: '0077879397',
    sendCurrency: 'ZAR',
    recieveCurrency: 'USD',
    isPaid: true,
    voulcherNum: '378847298723',
    taskCode: '9897288776',
    referenceNum: '909398923',
    reciever: 'john kanu',
    sendAmount: 4344,
    recieveAmount: 900,
    recieveMethod: 'Cash pickup',
    transationDate: '6/09/2022',
    pickupDate: '6/09/2022',
    cardDetails: {
      cardNum: '344265785321',
      validDate: '3/04/2022',
      cvvNum: '234',
    },
    password: '123456',
  },
  
  {
    firstname: 'James',
    lastname: 'rollin',
    email: 'rose@example.com',
    amount: '40000',
    sendCurrency: 'ZAR',
    recieveCurrency: '$',
    isPaid: true,
    voulcherNum: '378847298723',
    taskCode: '9897288776',
    referenceNum: '909398923',
    reciever: 'john kanu',
    sendAmount: 4344,
    recieveAmount: 900,
    recieveMethod: 'Cash pickup',
    transationDate: '6/09/2022',
    pickupDate: '6/09/2022',
    cardDetails: {
      cardNum: '344265785321',
      validDate: '3/04/2022',
      cvvNum: '234',
    },
    password: '123456',
  },

]

export default users
