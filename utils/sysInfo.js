export const sysInfo = wx.getSystemInfoSync();

export const isIPhoneX = sysInfo.model.indexOf("iPhone X") != -1;