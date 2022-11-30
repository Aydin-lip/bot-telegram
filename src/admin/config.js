require("dotenv").config()
const fs = require("fs")

// menu admin
const menuKey = () => {
  return {
    keyboard: [
      [{ text: "کاربر های ربات" }, { text: "اطلاعات دقیق کاربر مورد نظر" }],
      [{ text: "مشخصات آگهی های ثبت شده" }, { text: "آگهی های گزارش شده" }, { text: "آگهی های مسدود شده" }],
      [{ text: "ارسال پیام به تمام کاربرها" }, { text: "ارسال پیام به کاربر مورد نظر" }],
      [{ text: "ادمین های ربات" }, { text: "اضافه کردن ادمین جدید" }],
      [{ text: "تغییر پیام (کانال ما)" }, { text: "اضافه/حذف کردن کانال" }],
      [{ text: "تغییر پیام (درباره ما)" }],
      [{ text: "بازگشت به صفحه اصلی" }]
    ],
    resize_keyboard: true
  }
}


// Is the user an admin or not
const admin = ctx => {
  let admin = process.env.ADMIN
  let admins = fs.readFileSync("./data/config.json")
  let adminsData = JSON.parse(admins)[0]
  if (adminsData.admins.includes(ctx.chat.id) || admin == ctx.chat.id) {
    return true
  } else {
    ctx?.reply("شما به این بخش دسترسی ندارید")
  }
}

// get information user interested
let userInfo = false
const cancleUserInfo = (edit, userInfoA) => {
  if (edit) {
    userInfo = userInfoA
  } else {
    return userInfo
  }
}

// cancle edit user information
let editUser = false
let stepEditUser = 0
const cancleEditUser = (edit, how, editUserA, stepEditUserA) => {
  if (edit) {
    switch (how) {
      case "edit":
        editUser = editUserA
        break;
      case "step":
        stepEditUser = stepEditUserA
        break;
      case "All":
        editUser = editUserA
        stepEditUser = stepEditUserA
        break;

      default:
        break;
    }
  } else {
    switch (how) {
      case "edit":
        return editUser
      case "step":
        return stepEditUser
      case "All":
        return { editUser, stepEditUser }

      default:
        break;
    }
  }
}

// get all registered Ads
const callRegesteredAds = () => {
  let allRegister = fs.readFileSync("./data/registeredAds.json")
  let ads = JSON.parse(allRegister)
  return ads
}

// get profile for user
const callProfileUser = id => {
  let users = fs.readFileSync("./data/profiles.json")
  let usersData = JSON.parse(users)
  let user = usersData.filter(u => u.id == id)[0]
  return user
}

// all count ads 
const countAds = () => {
  let counts = fs.readFileSync("./data/countAds.json")
  let countsData = JSON.parse(counts)
  return countsData
}

// cancle edit ad user
let editAdUser = false
let stepEditAdUser = 0
const cancleEditAdUser = (edit, how, editAdA, stepAdA) => {
  if (edit) {
    switch (how) {
      case "edit":
        editAdUser = editAdA
      case "step":
        stepEditAdUser = stepAdA
      case "All":
        editAdUser = editAdA
        stepEditAdUser = stepAdA

      default:
        break;
    }
  } else {
    switch (how) {
      case "edit":
        return editAdUser
      case "step":
        return stepEditAdUser
      case "All":
        return { editAdUser, stepEditAdUser }

      default:
        break;
    }
  }
}

// send message for all user
let sendAllMessage = false
const sendAllMess = (edit, send) => {
  if (edit) {
    sendAllMessage = send
  } else {
    return sendAllMessage
  }
}

// send message for user
let sendUserMessage = false
let stepUserMessage = 0
const sendUserMess = (edit, how, sendA, stepA) => {
  if (edit) {
    switch (how) {
      case "send":
        sendUserMessage = sendA
        break;
      case "step":
        stepUserMessage = stepA
        break;
      case "All":
        sendUserMessage = sendA
        stepUserMessage = stepA
        break;

      default:
        break;
    }
  } else {
    switch (how) {
      case "send":
        return sendUserMessage
      case "step":
        return stepUserMessage
      case "All":
        return { sendUserMessage, stepUserMessage }

      default:
        break;
    }
  }
}

// add new admin
let addNewAdmin = false
const addAdmin = (edit, add) => {
  if (edit) {
    addNewAdmin = add
  } else {
    return addNewAdmin
  }
}

// change we channel message
let changeChannelMess = false
const changeChannelMessage = (edit, chang) => {
  if (edit) {
    changeChannelMess = chang
  } else {
    return changeChannelMess
  }
}

// add/change channel bot
let channelChange = false
const changeChannel = (edit, change) => {
  if (edit) {
    channelChange = change
  } else {
    return channelChange
  }
}

// edit message about us
let editMessageAboutUs = false
const aboutUs = (edit, change) => {
  if (edit) {
    editMessageAboutUs = change
  } else {
    return editMessageAboutUs
  }
}

let replyMessageON = false
const replyMessage = (edit, reply) => {
  if (edit) {
    replyMessageON = reply
  } else {
    return replyMessageON
  }
}


module.exports = [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser,
  callRegesteredAds,
  callProfileUser,
  countAds,
  cancleEditAdUser,
  sendAllMess,
  sendUserMess,
  addAdmin,
  changeChannelMessage,
  changeChannel,
  aboutUs,
  replyMessage]