require("dotenv").config()
const fs = require("fs")

// menu admin
const menuKey = () => {
  return {
    keyboard: [
      [{ text: "کاربر های ربات" }, { text: "اطلاعات دقیق کاربر مورد نظر" }],
      [{ text: "آگهی های ثبت شده" }, { text: "آگهی های گزارش شده" }, { text: "آگهی های مسدود شده" }],
      [{ text: "ارسال پیام به تمام کاربرها" }, { text: "ارسال پیام به کاربر مورد نظر" }],
      [{ text: "ادمین های ربات" }, { text: "اضافه کردن ادمین جدید" }],
      [{ text: "تغییر پیام (کانال ما)" }, { text: "اضافه کردن کانال" }],
      [{ text: "تغییر پیام (درباره ما)" }],
      [{ text: "بازگشت به صفحه اصلی" }]
    ],
    resize_keyboard: true
  }
}


// Is the user an admin or not
const admin = ctx => {
  let admins = process.env.ADMINS.split(",")
  if (admins.includes(String(ctx?.chat?.id))) {
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


module.exports = [
  menuKey,
  admin,
  cancleUserInfo,
  cancleEditUser]