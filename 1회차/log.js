const log = {
  info: function (info) {
    console.log("Info" + info);
  },
  Warning: function (Warning) {
    console.log("Warning" + Warning);
  },
  error: function (error) {
    console.log("Error" + error);
  },
};
module.exports = log;
